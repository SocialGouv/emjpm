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
  email: yup.string().required(),
  nom: yup.string().required(),
  prenom: yup.string().required(),
  siret: yup.string().required(),
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
      departements,
      email: data ? formatFormInput(data.email) : "",
      nom: data ? formatFormInput(data.nom) : "",
      prenom: data ? formatFormInput(data.prenom) : "",
      siret: data ? formatFormInput(data.siret) : "",
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
        <Card>
          <Flex pr={2} flexDirection="column">
            <Heading4 mb={1}>{"Informations"}</Heading4>
            <FormGroupInput
              placeholder="Siret"
              id="siret"
              formik={formik}
              validationSchema={validationSchema}
            />
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
          </Flex>
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
