import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";

import yup from "../../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormInt } from "../../../../util";
import { EnqueteStepperButtons } from "../../EnqueteStepperButtons";
import { useEnqueteForm } from "../../useEnqueteForm.hook";
import { buildMesureGroupsAttributes } from "./buildMesureGroupsAttributes";
import { EnqueteActiviteFormGroupMesures } from "./EnqueteActiviteFormGroupMesures";

// validation identique à celle de enqueteActiviteStatus
const validationSchema = yup.object(buildMesureGroupsAttributes([""]));

function dataToForm(data) {
  return {
    debutAnnee: formatFormInput(data.debutAnnee),
    finAnnee: formatFormInput(data.finAnnee),
    mesuresNouvelles: formatFormInput(data.mesuresNouvelles),
    sortieMesures: formatFormInput(data.sortieMesures),
  };
}

function formToData(data) {
  return {
    debutAnnee: parseFormInt(data.debutAnnee),
    finAnnee: parseFormInt(data.finAnnee),
    mesuresNouvelles: parseFormInt(data.mesuresNouvelles),
    sortieMesures: parseFormInt(data.sortieMesures),
  };
}

export const EnqueteActiviteMesuresForm = (props) => {
  const {
    title,
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const { submitForm, handleChange, values, errors, showError, submit } = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    formToData,
    loading,
  });
  return (
    <form onSubmit={submitForm}>
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

      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </form>
  );
};

export default EnqueteActiviteMesuresForm;
