import { Heading1, Heading3 } from "@emjpm/ui";
import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";

import yup from "../../../../lib/validationSchemas/yup";
import { EnqueteStepperButtons } from "../../EnqueteStepperButtons";
import { buildMesureGroupsAttributes } from "./buildMesureGroupsAttributes";
import { EnqueteActiviteFormGroupMesures } from "./EnqueteActiviteFormGroupMesures";

// validation identique à celle de enqueteActiviteStatus
const validationSchema = yup.object(buildMesureGroupsAttributes([""]));

function mapDataPropsToFormValues(data) {
  return {
    debutAnnee: data.debutAnnee || "",
    finAnnee: data.finAnnee || "",
    mesuresNouvelles: data.mesuresNouvelles || "",
    sortieMesures: data.sortieMesures || ""
  };
}

function mapFormValuesToSubmit(data) {
  return {
    debutAnnee: parseIntToSubmit(data.debutAnnee),
    finAnnee: parseIntToSubmit(data.finAnnee),
    mesuresNouvelles: parseIntToSubmit(data.mesuresNouvelles),
    sortieMesures: parseIntToSubmit(data.sortieMesures)
  };

  function parseIntToSubmit(value) {
    return value ? parseInt(value) : undefined;
  }
}

export const EnqueteActiviteMesuresForm = props => {
  const { goToPrevPage, title, loading, step, data = {} } = props;

  const { handleSubmit, submitCount, handleChange, values, errors, setValues } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(mapFormValuesToSubmit(values));
      setSubmitting(false);
    },
    initialValues: mapDataPropsToFormValues(data),
    validationSchema
  });

  useEffect(() => {
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues]);

  const showError = useMemo(() => step.status !== "empty" || submitCount !== 0, [
    step.status,
    submitCount
  ]);
  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Votre activité"}
      </Heading1>

      {title && <Heading3>{title}</Heading3>}

      <EnqueteActiviteFormGroupMesures
        values={values}
        errors={errors}
        showError={showError}
        handleChange={handleChange}
        prefix=""
      />

      <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnqueteActiviteMesuresForm;
