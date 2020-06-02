import { Heading1, Heading3 } from "@emjpm/ui";
import { useFormik } from "formik";
import React, { useEffect } from "react";

import { EnqueteStepperButtons } from "../../EnqueteStepperButtons";
import { EnqueteActiviteFormGroupMesures } from "./EnqueteActiviteFormGroupMesures";

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
  const { goToPrevPage, title, loading, data = {} } = props;

  const { handleSubmit, handleChange, values, errors, setValues } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(mapFormValuesToSubmit(values));
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
        {"Votre activité"}
      </Heading1>

      {title && <Heading3>{title}</Heading3>}

      <EnqueteActiviteFormGroupMesures
        values={values}
        errors={errors}
        handleChange={handleChange}
        prefix=""
      />

      <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnqueteActiviteMesuresForm;
