import { Button, Heading1, Heading3, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

export const EnquetePreposeModaliteExerciceEtablissementsForm = props => {
  const { goToPrevPage, loading = false } = props;
  const formik = useFormik({
    onSubmit: async () => {},
    initialValues: {
      etablissements: [
        {
          finess: "",
          raison_sociale: ""
        }
      ]
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

              <Flex mb={4}>
                <Box mr={2} flex={1 / 2}>
                  <Label mb={1} htmlFor="finess">
                    {"N° FINESS"}
                  </Label>
                  <Input
                    placeholder=""
                    id="finess"
                    name="finess"
                    value={formik.values.finess}
                    hasError={!!formik.errors.finess}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                  />
                  <InlineError message={formik.errors.finess} fieldId="finess" />
                </Box>
                <Box ml={2} flex={1 / 2}>
                  <Label mb={1} htmlFor="finess">
                    {"Raison sociale"}
                  </Label>
                  <Input
                    placeholder=""
                    id="finess"
                    name="finess"
                    value={formik.values.finess}
                    hasError={!!formik.errors.finess}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                  />
                  <InlineError message={formik.errors.finess} fieldId="finess" />
                </Box>
              </Flex>

              <Flex mb={4}>
                <Box mr={2} flex={1 / 2}>
                  <Label mb={1} htmlFor="finess">
                    {"N° FINESS"}
                  </Label>
                  <Input
                    placeholder=""
                    id="finess"
                    name="finess"
                    value={formik.values.finess}
                    hasError={!!formik.errors.finess}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                  />
                  <InlineError message={formik.errors.finess} fieldId="finess" />
                </Box>
                <Box ml={2} flex={1 / 2}>
                  <Label mb={1} htmlFor="finess">
                    {"Raison sociale"}
                  </Label>
                  <Input
                    placeholder=""
                    id="finess"
                    name="finess"
                    value={formik.values.finess}
                    hasError={!!formik.errors.finess}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                  />
                  <InlineError message={formik.errors.finess} fieldId="finess" />
                </Box>
              </Flex>

              <table>
                <thead>
                  <th>{"N° FINESS"}</th>
                  <th>{"Raison sociale"}</th>
                  <th>{"Status"}</th>
                  <th>{"Type d'établissement"}</th>
                </thead>
                <tbody>
                  {formik.values.etablissements.map((etablissement, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Input
                            placeholder=""
                            id={`etablissements.${index}.finess`}
                            name={`etablissements.${index}.finess`}
                            value={formik.values.etablissements[index].finess}
                            // hasError={!!errors.etablissements[index].finess}
                            onChange={formik.handleChange}
                            type="text"
                          />
                        </td>
                        <td>
                          <Input
                            placeholder=""
                            id={`etablissements.${index}.raison_sociale`}
                            name={`etablissements.${index}.raison_sociale`}
                            value={formik.values.etablissements[index].raison_sociale}
                            // hasError={!!errors.etablissements[index].raison_sociale}
                            onChange={formik.handleChange}
                            type="text"
                          />
                        </td>
                        <td>
                          <Input
                            placeholder=""
                            id={`etablissements.${index}.raison_sociale`}
                            name={`etablissements.${index}.raison_sociale`}
                            value={formik.values.etablissements[index].raison_sociale}
                            // hasError={!!errors.etablissements[index].raison_sociale}
                            onChange={formik.handleChange}
                            type="text"
                          />
                        </td>
                        <td>
                          <Input
                            placeholder=""
                            id={`etablissements.${index}.raison_sociale`}
                            name={`etablissements.${index}.raison_sociale`}
                            value={formik.values.etablissements[index].raison_sociale}
                            // hasError={!!errors.etablissements[index].raison_sociale}
                            onChange={formik.handleChange}
                            type="text"
                          />
                        </td>
                        <td>
                          <Button type="button" onClick={() => arrayHelpers.remove(index)}>
                            {"-"}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>
          )}
        />
        <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
      </Form>
    </FormikProvider>
  );
};

export default EnquetePreposeModaliteExerciceEtablissementsForm;
