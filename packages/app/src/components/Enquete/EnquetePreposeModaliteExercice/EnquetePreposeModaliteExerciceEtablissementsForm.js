import { Button, Input } from "@emjpm/ui";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import React from "react";

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
        <FieldArray
          name="etablissements"
          render={arrayHelpers => (
            <div>
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
              <Button
                mt={3}
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
            </div>
          )}
        />
        <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
      </Form>
    </FormikProvider>
  );
};

export default EnquetePreposeModaliteExerciceEtablissementsForm;
