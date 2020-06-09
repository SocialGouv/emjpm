/* eslint-disable no-unused-vars */
import { Button, Card, Heading1, Heading3, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { SquaredCross } from "@styled-icons/entypo/SquaredCross";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { findOption } from "../../../util/option/OptionUtil";
import { STATUTS, TYPES } from "../constants";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

const validationSchema = yup.object().shape({
  etablissements: yup.array().of(
    yup.object().shape({
      finess: yup.string().required(),
      nombre_journees_hospitalisation: yup
        .number()
        .min(0)
        .required(),
      nombre_lits: yup
        .number()
        .min(0)
        .required(),
      raison_sociale: yup.string().required(),
      statut: yup.string().required(),
      type: yup.string().required(),
      nombre_journees_esms: yup
        .number()
        .min(0)
        .required(),
      nombre_mesures: yup
        .number()
        .min(0)
        .required()
    })
  )
});

function mapDataPropsToFormFields(data) {
  if (!data.nombre_lits_journee_hospitalisation) {
    return {
      etablissements: [
        {
          finess: "",
          nombre_journees_hospitalisation: "",
          nombre_lits: "",
          raison_sociale: "",
          statut: "",
          type: "",
          nombre_journees_esms: "",
          nombre_mesures: ""
        }
      ]
    };
  } else {
    return {
      etablissements: data.nombre_lits_journee_hospitalisation.map(item => {
        return {
          finess: item.finess || "",
          nombre_journees_hospitalisation: item.nombre_journees_hospitalisation
            ? parseFloat(item.nombre_journees_hospitalisation)
            : "",
          nombre_lits: item.nombre_lits ? parseFloat(item.nombre_lits) : "",
          raison_sociale: item.raison_sociale || "",
          statut: item.statut || "",
          type: item.type || "",
          nombre_journees_esms: item.nombre_journees_esms
            ? parseFloat(item.nombre_journees_esms)
            : "",
          nombre_mesures: item.nombre_mesures ? parseFloat(item.nombre_mesures) : ""
        };
      })
    };
  }
}

export const EnquetePreposeModaliteExerciceEtablissementsForm = props => {
  const { goToPrevPage, loading = false, data } = props;

  const formik = useFormik({
    onSubmit: async () => {},
    initialValues: mapDataPropsToFormFields(data),
    validationSchema
  });

  const { setValues } = formik;
  useEffect(() => {
    setValues(mapDataPropsToFormFields(data));
  }, [data, setValues]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Modalité d'exercice"}
        </Heading1>

        <FieldArray
          name="etablissements"
          render={arrayHelpers => (
            <Box>
              <Flex mb={4} alignItems="center" justifyContent="space-between">
                <Heading3>{`${formik.values.etablissements.length} établissement${
                  formik.values.etablissements.length > 1 ? "s" : ""
                }`}</Heading3>

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
                        nombre_mesures: ""
                      });
                    }}
                  >
                    Ajouter un établissement
                  </Button>
                </Box>
              </Flex>

              {formik.values.etablissements.map((etablissement, index) => {
                const value = formik.values.etablissements
                  ? formik.values.etablissements[index]
                  : null;
                const error = formik.errors.etablissements
                  ? formik.errors.etablissements[index]
                  : null;

                return (
                  <Card mb={4} key={`etablissement-${index}`} sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        right: 2,
                        cursor: "pointer"
                      }}
                    >
                      <SquaredCross width={"20px"} onClick={() => arrayHelpers.remove(index)} />
                    </Box>

                    <Flex mt={4} mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <Label mb={1} htmlFor={`etablissements.${index}.finess`}>
                          {"N° FINESS"}
                        </Label>
                        <Input
                          id={`etablissements.${index}.finess`}
                          name={`etablissements.${index}.finess`}
                          value={value.finess}
                          placeholder=""
                          hasError={error ? !!error.finess : false}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                        />
                        <InlineError
                          message={error ? error.finess : ""}
                          fieldId={`etablissements.${index}.finess`}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <Label mb={1} htmlFor={`etablissements.${index}.raison_sociale`}>
                          {"Raison sociale"}
                        </Label>
                        <Input
                          placeholder=""
                          id={`etablissements.${index}.raison_sociale`}
                          name={`etablissements.${index}.raison_sociale`}
                          value={value.raison_sociale}
                          hasError={error ? !!error.raison_sociale : false}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                        />
                        <InlineError
                          message={error ? error.raison_sociale : ""}
                          fieldId={`etablissements.${index}.raison_sociale`}
                        />
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <Label mb={1} htmlFor={`etablissements.${index}.statut`}>
                          {"Statut de l'établissement"}
                        </Label>
                        <Select
                          placeholder=""
                          instanceId={`etablissements.${index}.statut`}
                          id={`etablissements.${index}.statut`}
                          name={`etablissements.${index}.statut`}
                          value={findOption(STATUTS.byKey, value.statut)}
                          hasError={error ? !!error.statut : false}
                          onChange={option =>
                            formik.setFieldValue(`etablissements[${index}].statut`, option.value)
                          }
                          options={STATUTS.byKey}
                        />
                        <InlineError
                          message={error ? error.statut : ""}
                          fieldId={`etablissements.${index}.statut`}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <Label mb={1} htmlFor="type">
                          {"Type d'établissement"}
                        </Label>
                        <Select
                          placeholder=""
                          instanceId={`etablissements.${index}.type`}
                          id={`etablissements.${index}.type`}
                          name={`etablissements.${index}.type`}
                          value={findOption(TYPES.byKey, value.type)}
                          hasError={error ? !!error.type : false}
                          onChange={option =>
                            formik.setFieldValue(`etablissements[${index}].type`, option.value)
                          }
                          options={TYPES.byKey}
                        />
                        <InlineError
                          message={error ? error.type : ""}
                          fieldId={`etablissements.${index}.type`}
                        />
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <Label mb={1} htmlFor={`etablissements.${index}.nombre_lits`}>
                          {"Nombre de lits ou de places"}
                        </Label>
                        <Input
                          placeholder=""
                          id={`etablissements.${index}.nombre_lits`}
                          name={`etablissements.${index}.nombre_lits`}
                          value={value.nombre_lits}
                          hasError={error ? !!error.nombre_lits : false}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="number"
                        />
                        <InlineError
                          message={error ? error.nombre_lits : ""}
                          fieldId={`etablissements.${index}.nombre_lits`}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <Label
                          mb={1}
                          htmlFor={`etablissements.${index}.nombre_journees_hospitalisation`}
                        >
                          {"Nombre de journées d'hospitalisation complètes"}
                        </Label>
                        <Input
                          placeholder=""
                          id={`etablissements.${index}.nombre_journees_hospitalisation`}
                          name={`etablissements.${index}.nombre_journees_hospitalisation`}
                          value={value.nombre_journees_hospitalisation}
                          hasError={error ? !!error.nombre_journees_hospitalisation : false}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="number"
                        />
                        <InlineError
                          message={error ? error.nombre_journees_hospitalisation : ""}
                          fieldId={`etablissements.${index}.nombre_journees_hospitalisation`}
                        />
                      </Box>
                    </Flex>
                    <Flex mb={4}>
                      <Box mr={2} flex={1 / 2}>
                        <Label mb={1} htmlFor={`etablissements.${index}.nombre_mesures`}>
                          {"Nombre de mesures au 31/12"}
                        </Label>
                        <Input
                          placeholder=""
                          id={`etablissements.${index}.nombre_mesures`}
                          name={`etablissements.${index}.nombre_mesures`}
                          value={value.nombre_mesures}
                          hasError={error ? !!error.nombre_mesures : false}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="number"
                        />
                        <InlineError
                          message={error ? error.nombre_mesures : ""}
                          fieldId={`etablissements.${index}.nombre_mesures`}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <Label mb={1} htmlFor={`etablissements.${index}.nombre_journees_esms`}>
                          {"Nombre de journées pour les ESMS"}
                        </Label>
                        <Input
                          placeholder=""
                          id={`etablissements.${index}.nombre_journees_esms`}
                          name={`etablissements.${index}.nombre_journees_esms`}
                          value={value.nombre_journees_esms}
                          hasError={error ? !!error.nombre_journees_esms : false}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="number"
                        />
                        <InlineError
                          message={error ? error.nombre_journees_esms : ""}
                          fieldId={`etablissements.${index}.nombre_journees_esms`}
                        />
                      </Box>
                    </Flex>
                  </Card>
                );
              })}
            </Box>
          )}
        />
        <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
      </Form>
    </FormikProvider>
  );
};

export default EnquetePreposeModaliteExerciceEtablissementsForm;
