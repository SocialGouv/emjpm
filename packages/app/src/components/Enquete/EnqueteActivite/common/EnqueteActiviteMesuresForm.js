import { HeadingTitle } from "~/components/HeadingTitle";
import yup from "~/lib/validationSchemas/yup";
import { Heading3 } from "~/ui";
import { formatFormInput, parseFormInt } from "~/util";

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

  const enqueteForm = useEnqueteForm({
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

      {title && <Heading3>{title}</Heading3>}

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
};

export default EnqueteActiviteMesuresForm;
