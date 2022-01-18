import { useCallback, useEffect, useState, useMemo } from "react";
import { useFormik } from "formik";
import { Box, Flex, Text } from "rebass";

import { isAdmin } from "@emjpm/biz";

import { useApolloClient } from "@apollo/client";

import { checkDuplicateMandataireSIRET } from "~/query-service/emjpm-hasura/checkDuplicateListeBlancheSIRET";

import useDebouncedEffect from "~/hooks/useDebouncedEffect";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/containers/Commons";
import useUser from "~/hooks/useUser";
import yup from "~/validation-schemas/yup";
import { Button, Heading, Field, InlineError } from "~/components";
import { formatFormInput } from "~/utils/form";
import { DepartementFormUtil } from "~/utils/departements";

import SelectSIRET from "~/containers/SelectSIRET";
import SelectAdresse from "~/containers/SelectAdresse";
import { GeocodeCities } from "~/components/Geocode";

import { ListeBlancheIndividuelFormDepartementsSelection } from "./ListeBlancheIndividuelFormDepartementsSelection";
import { ListeBlancheIndividuelFormDepartementsSelector } from "./ListeBlancheIndividuelFormDepartementsSelector";

const lbSchema = ({ apolloClient }) =>
  yup.object().shape({
    adresse1: yup.string().required().nullable(),
    adresse2: yup.string().optional().nullable(),
    code_postal: yup
      .string()
      .matches(/^[0-9]{5}$/, "Le code postal doit être composé de 5 chiffres.")
      .required(),
    email: yup.string().required(),
    nom: yup.string().required(),
    prenom: yup.string().required(),
    siret: yup
      .string()
      .matches(/^[0-9]{14}$/, "Le SIRET doit être composé de 14 chiffres.")
      .required()
      .test(
        "siret-duplicate",
        "Le numéro SIRET que vous venez de saisir existe déjà pour un mandataire sur eMJPM.",
        (value, { parent }) => {
          if (value === parent.initialSiret) {
            return true;
          }
          return checkDuplicateMandataireSIRET(apolloClient, value);
        }
      ),
    ville: yup.string().required(),
  });

export function ListeBlancheIndividuelForm(props) {
  const { handleCancel, data, editMode = false } = props;

  const apolloClient = useApolloClient();
  const validationSchema = useMemo(
    () => lbSchema({ apolloClient }),
    [apolloClient]
  );

  const departements =
    data && data.lb_departements
      ? data.lb_departements.map((item) => {
          return {
            departement_financeur: item.departement_financeur,
            id: item.departement_code,
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
      siret: data ? formatFormInput(data.siret) : "",
      initialSiret: data ? formatFormInput(data.siret) : "",
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

  const user = useUser();

  useDebouncedEffect(
    () => {
      let { siret } = formik.values;
      if (!siret) {
        siret = "";
      }
      siret = siret.replace(/\s/g, "");
      siret = siret.substr(0, 14);
      formik.setFieldValue("siret", siret);
    },
    500,
    [formik.values["siret"]]
  );

  const { setFieldValue } = formik;

  const [selectedSiretData, setSelectedSiretData] = useState();
  const setSelectedSiretDataCallback = useCallback(
    ({ data }) => setSelectedSiretData(data),
    [setSelectedSiretData]
  );
  useEffect(() => {
    if (!selectedSiretData) {
      return;
    }
    const {
      nom_raison_sociale,
      l4_declaree,
      l5_declaree,
      code_postal,
      libelle_commune,
      departement,
    } = selectedSiretData;

    setFieldValue("etablissement", nom_raison_sociale || "");
    setFieldValue("adresse1", l4_declaree || "");
    setFieldValue("adresse2", l5_declaree || "");
    setFieldValue("code_postal", code_postal || "");
    setFieldValue("ville", libelle_commune || "");
    setFieldValue("departement", departement || "");
  }, [selectedSiretData, setFieldValue]);

  const [selectedAdresseData, setSelectedAdresseData] = useState();
  const setSelectedAdresseDataCallback = useCallback(
    ({ data }) => setSelectedAdresseData(data),
    [setSelectedAdresseData]
  );
  useEffect(() => {
    if (!selectedAdresseData) {
      return;
    }
    const { postcode, city } = selectedAdresseData;
    setFieldValue("code_postal", postcode || "");
    setFieldValue("ville", city || "");
  }, [selectedAdresseData, setFieldValue]);

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="structure_juridique">
            {"Structure juridique"}
          </Heading>
        </FormGrayBox>
        <FormInputBox rol="group" aria-labelledby="structure_juridique">
          <SelectSIRET
            id="siret"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedSiretDataCallback}
          />
          <SelectAdresse
            placeholder="Adresse 1"
            id="adresse1"
            formik={formik}
            validationSchema={validationSchema}
            setSelectedOption={setSelectedAdresseDataCallback}
          />
          <FormGroupInput
            placeholder="Complément"
            id="adresse2"
            formik={formik}
            validationSchema={validationSchema}
          />
          <Flex justifyContent="space-between">
            <Box mr={1} flex={1 / 2}>
              <FormGroupInput
                placeholder="Code postal"
                id="code_postal"
                formik={formik}
                required
                validationSchema={validationSchema}
                onChange={(e) => {
                  const { value } = e.target;
                  formik.setFieldValue("code_postal", value);
                  formik.setFieldValue("ville", "");
                }}
                size="small"
              />
            </Box>
            <Box ml={1} flex={1 / 2}>
              <Field>
                <GeocodeCities
                  placeholder="Ville"
                  name="ville"
                  id="ville"
                  required
                  zipcode={formik.values.code_postal}
                  onChange={(value) => formik.setFieldValue("ville", value)}
                  value={formik.values.ville}
                  hasError={formik.touched.ville && formik.errors.ville}
                  size="small"
                  departementFieldId="departement"
                  formik={formik}
                  aria-describedby="msg-ville"
                />
                <div id="msg-ville">
                  {formik.touched.ville && (
                    <InlineError
                      message={formik.errors.ville}
                      fieldId="ville"
                    />
                  )}
                </div>
              </Field>
            </Box>
          </Flex>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="mandataire">
            {"Mandataire"}
          </Heading>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="mandataire">
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
          <Heading size={4} mb={1} id="liste_des_agrements">
            {"Liste des agréments"}
          </Heading>
          <Text mt={2} mb={1}>
            {
              "Ajouter les départements dans lesquels ce mandataire a un agrément, et sélectionner son département financeur."
            }
          </Text>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="liste_des_agrements">
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
