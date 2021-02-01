import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Flex, Text } from "rebass";

import { isAdmin } from "@emjpm/biz";

import useDebouncedEffect from "~/hooks/useDebouncedEffect";
import { codePostalExists } from "~/util/codePostal";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/components/Commons";
import { UserContext } from "~/components/UserContext";
import yup from "~/lib/validationSchemas/yup";
import { Button, Heading4 } from "~/ui";
import { formatFormInput } from "~/util";
import { DepartementFormUtil } from "~/util/departements";
import SelectSIREN from "~/components/SelectSIREN";

import { ListeBlancheIndividuelFormDepartementsSelection } from "./ListeBlancheIndividuelFormDepartementsSelection";
import { ListeBlancheIndividuelFormDepartementsSelector } from "./ListeBlancheIndividuelFormDepartementsSelector";

const validationSchema = yup.object().shape({
  adresse1: yup.string().required(),
  adresse2: yup.string().optional(),
  code_postal: yup
    .string()
    .matches(/^[0-9]{5}$/, "Le code postal doit être composé de 5 chiffres.")
    .required()
    .test(
      "code_postal_exists",
      "ce code postal n'existe pas",
      async (value) => {
        return value && (await codePostalExists(value));
      }
    ),
  email: yup.string().required(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  siren: yup
    .string()
    .matches(/^[0-9]{9}$/, "Le SIREN doit être composé de 9 chiffres.")
    .required(),
  ville: yup.string().required(),
});

export function ListeBlancheIndividuelForm(props) {
  const { handleCancel, data, editMode = false } = props;

  const departements =
    data && data.lb_departements
      ? data.lb_departements.map((item) => {
          return {
            departement_financeur: item.departement_financeur,
            id: item.departement_id,
            nom: DepartementFormUtil.formatDepartementLabel(item.departement),
          };
        })
      : [];

  const formik = useFormik({
    initialValues: {
      adresse1: data ? formatFormInput(data.adresse1) : "",
      adresse2: data ? formatFormInput(data.adresse2) : "",
      code_postal: data ? formatFormInput(data.code_postal) : "",
      departements,
      email: data ? formatFormInput(data.email) : "",
      nom: data ? formatFormInput(data.nom) : "",
      prenom: data ? formatFormInput(data.prenom) : "",
      siren: data ? formatFormInput(data.siren) : "",
      ville: data ? formatFormInput(data.ville) : "",
    },
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        props.handleSubmit(values);
        setSubmitting(false);
      } catch (err) {
        if (err.message.includes("lb_users_siret_unique")) {
          setFieldError("siret", "Le siret renseigné est déjà existant");
        }

        if (err.message.includes("lb_users_email_unique")) {
          setFieldError("email", "L'email renseigné est déjà existant");
        }
      }
    },
    validationSchema,
  });

  const user = useContext(UserContext);

  useDebouncedEffect(
    () => {
      let { siren = "" } = formik.values;
      siren = siren.replace(/\s/g, "");
      siren = siren.substr(0, 9);
      formik.setFieldValue("siren", siren);
    },
    500,
    [formik.values["siren"]]
  );
  useDebouncedEffect(
    () => {
      let { code_postal: codePostal = "" } = formik.values;
      codePostal = codePostal.replace(/\s/g, "");
      formik.setFieldValue("code_postal", codePostal);
    },
    500,
    [formik.values["code_postal"]]
  );

  const [selectedSirenData, setSelectedSirenData] = useState(() => ({}));
  useEffect(() => {
    const {
      l4_declaree,
      l5_declaree,
      code_postal,
      libelle_commune,
    } = selectedSirenData;
    formik.setValues({
      ...formik.values,
      adresse1: l4_declaree || "", // https://sirene.fr/sirene/public/variable/l4-declaree
      adresse2: l5_declaree || "", // https://sirene.fr/sirene/public/variable/l5-declaree
      code_postal: code_postal || "",
      ville: libelle_commune || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSirenData]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Structure juridique"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <SelectSIREN
            id="siren"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={({ data }) => setSelectedSirenData(data)}
          />
          <FormGroupInput
            placeholder="Adresse 1"
            id="adresse1"
            formik={formik}
            validationSchema={validationSchema}
          />
          <FormGroupInput
            placeholder="Complément"
            id="adresse2"
            formik={formik}
            validationSchema={validationSchema}
          />
          <Flex>
            <Box flex={1 / 2}>
              <FormGroupInput
                placeholder="Code postal"
                id="code_postal"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Box>
            <Box pl={1} flex={1 / 2}>
              <FormGroupInput
                placeholder="Ville"
                id="ville"
                formik={formik}
                validationSchema={validationSchema}
              />
            </Box>
          </Flex>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Mandataire"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Nom"
            id="nom"
            formik={formik}
            validationSchema={validationSchema}
          />
          <FormGroupInput
            placeholder="Prénom"
            id="prenom"
            formik={formik}
            validationSchema={validationSchema}
          />

          <FormGroupInput
            placeholder="Adresse e-mail"
            id="email"
            formik={formik}
            validationSchema={validationSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Liste des agréments"}</Heading4>
          <Text mt={2} mb={1}>
            {
              "Ajouter les départements dans lesquels ce mandataire a un agrément, et sélectionner son département financeur."
            }
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <ListeBlancheIndividuelFormDepartementsSelection
            departements={formik.values.departements}
            editMode={editMode}
            onRemove={(id) => {
              formik.setFieldValue(
                "departements",
                formik.values.departements.filter((d) => d.id !== id)
              );
            }}
            setDepartementFinanceur={(id) => {
              formik.setFieldValue(
                "departements",
                formik.values.departements.map((d) => {
                  return {
                    ...d,
                    departement_financeur: id === d.id,
                  };
                })
              );
            }}
          />

          <ListeBlancheIndividuelFormDepartementsSelector
            departements={formik.values.departements}
            onAdd={(departement) =>
              formik.setFieldValue(
                "departements",
                formik.values.departements.concat({
                  ...departement,
                  departement_financeur: false,
                })
              )
            }
          />
        </FormInputBox>
      </Flex>

      <Flex mt={4} justifyContent="flex-end">
        {editMode && isAdmin(user) && (
          <Box>
            <Link to={`/admin/liste-blanche/${data.id}/delete`}>
              <Button mr="2" bg="red">
                Supprimer
              </Button>
            </Link>
          </Box>
        )}
        {handleCancel && (
          <Box>
            <Button
              type="button"
              mr="2"
              variant="outline"
              onClick={handleCancel}
            >
              Annuler
            </Button>
          </Box>
        )}
        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
          >
            {editMode ? "Mettre à jour" : "Enregistrer"}
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export default ListeBlancheIndividuelForm;
