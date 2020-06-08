/* eslint-disable no-unused-vars */
import { Button, Card, Heading1, Heading3, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { SquaredCross } from "@styled-icons/entypo/SquaredCross";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { findOption } from "../../../util/option/OptionUtil";
import { STATUTS, TYPES } from "../constants";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

export const EnquetePreposeModaliteExerciceEtablissementsForm = props => {
  const { goToPrevPage, loading = false, data } = props;
  const { nombre_lits_journee_hospitalisation } = data;

  const etablissements = nombre_lits_journee_hospitalisation.length
    ? nombre_lits_journee_hospitalisation
    : [
        {
          finess: "",
          nombre_journees_hospitalisation: "",
          nombre_lits: "",
          raison_sociale: "",
          status: "",
          type: ""
        }
      ];

  const formik = useFormik({
    onSubmit: async () => {},
    initialValues: {
      etablissements
    }
  });

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
                        raison_sociale: "",
                        open: true
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
                        <Label mb={1} htmlFor="finess">
                          {"N° FINESS"}
                        </Label>
                        <Input
                          id={`etablissements.${index}.finess`}
                          name={`etablissements.${index}.finess`}
                          value={value.finess}
                          placeholder=""
                          hasError={error ? error.finess : false}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                        />
                        <InlineError
                          message={formik.errors.finess}
                          fieldId={`etablissements.${index}.finess`}
                        />
                      </Box>
                      <Box ml={2} flex={1 / 2}>
                        <Label mb={1} htmlFor="finess">
                          {"Raison sociale"}
                        </Label>
                        <Input
                          placeholder=""
                          id={`etablissements.${index}.raison_sociale`}
                          name={`etablissements.${index}.raison_sociale`}
                          value={value.raison_sociale}
                          hasError={error && error.raison_sociale}
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
                        <Label mb={1} htmlFor="finess">
                          {"Statut de l'établissement"}
                        </Label>
                        <Select
                          placeholder=""
                          instanceId={`etablissements.${index}.statut`}
                          id={`etablissements.${index}.statut`}
                          name={`etablissements.${index}.statut`}
                          value={findOption(STATUTS.byKey, value.statut)}
                          hasError={error ? error.statut : false}
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
                          hasError={error ? error.type : false}
                          onChange={option =>
                            formik.setFieldValue(`etablissements[${index}].type`, option.value)
                          }
                          options={TYPES.byKey}
                        />
                        <InlineError
                          message={formik.errors.type}
                          fieldId={`etablissements.${index}.type`}
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
