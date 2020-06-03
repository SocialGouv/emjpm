import { Field, Heading1, Heading3, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Box } from "rebass";

import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

function mapDataPropsToFormValues(data) {
  return {
    departement: data.departement || "",
    region: data.region || "",
    raison_sociale: data.raison_sociale || "",
    personnalite_juridique: data.personnalite_juridique || ""
  };
}

export const EnquetePreposeModaliteExerciceInformationsForm = props => {
  const { goToPrevPage, loading = false, data = {} } = props;
  const { handleSubmit, handleChange, values, errors, setValues } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    initialValues: mapDataPropsToFormValues(data)
  });

  useEffect(() => {
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues]);

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Modalité d'exercice"}
      </Heading1>
      <Heading3>{"Informations générales"}</Heading3>
      <Box mt={4}>
        <Field>
          <Label mb={1} htmlFor="departement">
            {"Département"}
          </Label>
          <Input
            placeholder=""
            id="departement"
            name="departement"
            value={values.departement}
            hasError={!!errors.departement}
            onChange={handleChange}
            type="text"
          />
          <InlineError message={errors.departement} fieldId="departement" />
        </Field>
        <Field>
          <Label mb={1} htmlFor="region">
            {"Région"}
          </Label>
          <Input
            placeholder=""
            id="region"
            name="region"
            value={values.region}
            hasError={!!errors.region}
            onChange={handleChange}
            type="text"
          />
          <InlineError message={errors.region} fieldId="region" />
        </Field>
        <Field>
          <Label mb={1} htmlFor="raison_sociale">
            {"Raison sociale de l'établissement dont dépend le préposé"}
          </Label>
          <Input
            placeholder=""
            id="raison_sociale"
            name="raison_sociale"
            value={values.raison_sociale}
            hasError={!!errors.raison_sociale}
            onChange={handleChange}
            type="text"
          />
          <InlineError message={errors.raison_sociale} fieldId="raison_sociale" />
        </Field>
        <Field>
          <Label mb={1} htmlFor="personnalite_juridique">
            {
              "Indiquez la personnalité juridique de l'établissement dont dépend le(s) préposé(s) dans le menu déroulant"
            }
          </Label>
          <Input
            placeholder=""
            id="personnalite_juridique"
            name="personnalite_juridique"
            value={values.personnalite_juridique}
            hasError={!!errors.personnalite_juridique}
            onChange={handleChange}
            type="text"
          />
          <InlineError message={errors.personnalite_juridique} fieldId="personnalite_juridique" />
        </Field>
        <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
      </Box>
    </form>
  );
};

export default EnquetePreposeModaliteExerciceInformationsForm;
