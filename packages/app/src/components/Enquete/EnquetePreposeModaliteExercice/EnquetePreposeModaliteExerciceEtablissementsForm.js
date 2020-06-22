/* eslint-disable no-unused-vars */
import { Button, Card, Heading1, Heading3 } from "@emjpm/ui";
import { SquaredCross } from "@styled-icons/entypo/SquaredCross";
import { FieldArray, FormikProvider } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput } from "../../../util";
import { STATUTS, TYPES } from "../constants";
import {
  EnqueteFormInputField,
  EnqueteFormSelectField,
  EnqueteFormYesNoField,
} from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object().shape({
  actions_information_tuteurs_familiaux: yup.boolean().required(),
  etablissements: yup.array().of(
    yup.object().shape({
      finess: yup.string().required(),
      nombre_journees_hospitalisation: yup.number().min(0).required(),
      nombre_lits: yup.number().min(0).required(),
      raison_sociale: yup.string().required(),
      statut: yup.string().required(),
      type: yup.string().required(),
      nombre_journees_esms: yup.number().min(0).required(),
      nombre_mesures: yup.number().min(0).required(),
    })
  ),
});

function dataToForm(data) {
  const result = {
    actions_information_tuteurs_familiaux: data.actions_information_tuteurs_familiaux || false,
  };

  if (!data.nombre_lits_journee_hospitalisation) {
    return {
      ...result,
      etablissements: [
        {
          finess: "",
          nombre_journees_hospitalisation: "",
          nombre_lits: "",
          raison_sociale: "",
          statut: "",
          type: "",
          nombre_journees_esms: "",
          nombre_mesures: "",
        },
      ],
    };
  } else {
    const items = data.nombre_lits_journee_hospitalisation;
    return {
      ...result,
      etablissements: items.map((item) => {
        return {
          finess: formatFormInput(item.finess),
          nombre_journees_hospitalisation: formatFormInput(item.nombre_journees_hospitalisation),
          nombre_lits: formatFormInput(item.nombre_lits),
          raison_sociale: formatFormInput(item.raison_sociale),
          statut: formatFormInput(item.statut),
          type: formatFormInput(item.type),
          nombre_journees_esms: formatFormInput(item.nombre_journees_esms),
          nombre_mesures: formatFormInput(item.nombre_mesures),
        };
      }),
    };
  }
}

// nested arrays: https://jaredpalmer.com/formik/docs/guides/arrays
export const EnquetePreposeModaliteExerciceEtablissementsForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const enqueteForm = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    loading,
  });
  const { submitForm, readOnly, values, errors, submit, formik } = enqueteForm;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={submitForm}>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Modalité d'exercice"}
        </Heading1>
        <Box mb={4}>
          <EnqueteFormYesNoField
            id={`actions_information_tuteurs_familiaux`}
            label="Vous menez des actions d'information des tuteurs familiaux"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Box>
        <FieldArray
          name="etablissements"
          render={(arrayHelpers) => (
            <Box>
              <Flex mb={4} alignItems="center" justifyContent="space-between">
                <Heading3>{`${values.etablissements.length} établissement${
                  values.etablissements.length > 1 ? "s" : ""
                }`}</Heading3>

                {!readOnly && (
                  <Box>
                    <Button
                      type="button"
                      onClick={() => {
                        arrayHelpers.push({
                          finess: "",
                          nombre_journees_hospitalisation: "",
                          nombre_lits: "",
                          raison_sociale: "",
                          statut: "",
                          type: "",
                          nombre_journees_esms: "",
                          nombre_mesures: "",
                        });
                      }}
                    >
                      Ajouter un établissement
                    </Button>
                  </Box>
                )}
              </Flex>
              {values.etablissements.map((etablissement, index) => {
                const value = etablissement ? etablissement : {};
                const error = errors.etablissements ? errors.etablissements[index] || {} : {};

                return (
                  <Card mb={4} key={`etablissement-${index}`} sx={{ position: "relative" }}>
                    {!readOnly && (
                      <Box
                        sx={{
                          position: "absolute",
                          right: 2,
                          cursor: "pointer",
                        }}
                      >
                        <SquaredCross width={"20px"} onClick={() => arrayHelpers.remove(index)} />
                      </Box>
                    )}
                    <Flex mt={4} mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].finess`}
                          label="N° FINESS"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.finess}
                          error={error.finess}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].raison_sociale`}
                          label="Raison sociale"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.raison_sociale}
                          error={error.raison_sociale}
                        />
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <EnqueteFormSelectField
                          id={`etablissements[${index}].statut`}
                          label="Statut de l'établissement"
                          required={true}
                          options={STATUTS.byKey}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.statut}
                          error={error.statut}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <EnqueteFormSelectField
                          id={`etablissements[${index}].type`}
                          label="Type d'établissement"
                          required={true}
                          options={TYPES.byKey}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.type}
                          error={error.type}
                        />
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].nombre_lits`}
                          label="Nombre de lits ou de places"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.nombre_lits}
                          error={error.nombre_lits}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].nombre_journees_hospitalisation`}
                          label="Nombre de journées d'hospitalisation complètes"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.nombre_journees_hospitalisation}
                          error={error.nombre_journees_hospitalisation}
                        />
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].nombre_mesures`}
                          label="Nombre de mesures au 31/12"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.nombre_mesures}
                          error={error.nombre_mesures}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <EnqueteFormInputField
                          id={`etablissements[${index}].nombre_journees_esms`}
                          label="Nombre de journées pour les ESMS"
                          required={true}
                          enqueteContext={enqueteContext}
                          enqueteForm={enqueteForm}
                          value={value.nombre_journees_esms}
                          error={error.nombre_journees_esms}
                        />
                      </Box>
                    </Flex>
                  </Card>
                );
              })}
            </Box>
          )}
        />
        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </form>
    </FormikProvider>
  );
};

export default EnquetePreposeModaliteExerciceEtablissementsForm;
