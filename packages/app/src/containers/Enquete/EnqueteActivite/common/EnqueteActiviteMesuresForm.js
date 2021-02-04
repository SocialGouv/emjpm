import { HeadingTitle } from "~/containers/HeadingTitle";
import yup from "~/validation-schemas/yup";
import { Heading } from "~/components";
import { formatFormInput, parseFormInt } from "~/utils/form";

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

export function EnqueteActiviteMesuresForm(props) {
  const {
    title,
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    sections,
  } = props;

  const enqueteForm = useEnqueteForm({
    currentStep: props.currentStep,
    sections,
    data,
    dataToForm,
    dispatchEnqueteContextEvent,
    enqueteContext,
    formToData,
    loading,
    onSubmit,
    step,
    validationSchema,
  });
  const { submitForm, errors, showError, submit } = enqueteForm;
  return (
    <form onSubmit={submitForm}>
      <HeadingTitle textAlign="center" mb={"50px"}>
        {"Votre activité en 2019"}
      </HeadingTitle>

      {title && <Heading size={3}>{title}</Heading>}

      <EnqueteActiviteFormGroupMesures
        enqueteContext={enqueteContext}
        enqueteForm={enqueteForm}
        errors={errors}
        showError={showError}
        prefix=""
      />

      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </form>
  );
}

export default EnqueteActiviteMesuresForm;
