import { Button, Heading4 } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Card, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput } from "../../../util";
import { DepartementFormUtil } from "../../../util/departements";
import { FormGroupInput } from "../../AppForm";
import { ListeBlancheIndividuelFormDepartementsSelection } from "./ListeBlancheIndividuelFormDepartementsSelection";
import { ListeBlancheIndividuelFormDepartementsSelector } from "./ListeBlancheIndividuelFormDepartementsSelector";

const validationSchema = yup.object().shape({
  adresse1: yup.string().required(),
  adresse2: yup.string().optional(),
  code_postal: yup
    .string()
    .matches(/^[0-9]{5}$/, "Le code postal doit être composé de 5 chiffres.")
    .required(),
  email: yup.string().required(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  siret: yup.string().required(),
  ville: yup.string().required(),
});

export const ListeBlancheIndividuelForm = (props) => {
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
      siret: data ? formatFormInput(data.siret) : "",
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mt={4}>
        <Flex>
          <Card m={1} flex={1 / 2}>
            <Heading4 mb={1}>{"Mandataire"}</Heading4>
            <FormGroupInput
              placeholder="Siret"
              id="siret"
              formik={formik}
              validationSchema={validationSchema}
            />
            <Flex>
              <Box flex={1 / 2}>
                <FormGroupInput
                  placeholder="Nom"
                  id="nom"
                  formik={formik}
                  validationSchema={validationSchema}
                />
              </Box>
              <Box pl={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Prénom"
                  id="prenom"
                  formik={formik}
                  validationSchema={validationSchema}
                />
              </Box>
            </Flex>

            <FormGroupInput
              placeholder="Adresse e-mail"
              id="email"
              formik={formik}
              validationSchema={validationSchema}
            />
          </Card>
          <Card m={1} flex={1 / 2}>
            <Flex pr={2} flexDirection="column">
              <Heading4 mb={1}>{"Adresse"}</Heading4>
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
            </Flex>
          </Card>
        </Flex>
        <Card m={1}>
          <Heading4 mb={1}>{"Liste des agréments"}</Heading4>
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
        </Card>

        <Flex mt={4} justifyContent="flex-end">
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
      </Box>
    </form>
  );
};

export default ListeBlancheIndividuelForm;
