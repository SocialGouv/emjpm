import { Box, Text } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import yup from "~/validation-schemas/yup";
import { Heading } from "~/components";
import { formatFormInput, parseFormInt } from "~/utils/form";

import { EnqueteStepperButtons } from "../../EnqueteStepperButtons";
import { useEnqueteForm } from "../../useEnqueteForm.hook";
import { buildMesureGroupsAttributes } from "./buildMesureGroupsAttributes";
import { EnqueteActiviteFormGroupMesures } from "./EnqueteActiviteFormGroupMesures";

const strongStyle = {
  color: "#0072ca",
  display: "inline-block",
  fontWeight: "bold",
};

// validation identique à celle de enqueteActiviteStatus
const validationSchema = yup.object(
  buildMesureGroupsAttributes(["etablissement", "domicile"])
);

function dataToForm(data) {
  return {
    domicileDebutAnnee: formatFormInput(data.domicileDebutAnnee),
    domicileFinAnnee: formatFormInput(data.domicileFinAnnee),
    domicileMesuresNouvelles: formatFormInput(data.domicileMesuresNouvelles),
    domicileSortieMesures: formatFormInput(data.domicileSortieMesures),
    etablissementDebutAnnee: formatFormInput(data.etablissementDebutAnnee),
    etablissementFinAnnee: formatFormInput(data.etablissementFinAnnee),
    etablissementMesuresNouvelles: formatFormInput(
      data.etablissementMesuresNouvelles
    ),
    etablissementSortieMesures: formatFormInput(
      data.etablissementSortieMesures
    ),
  };
}

function formToData(data) {
  return {
    domicileDebutAnnee: parseFormInt(data.domicileDebutAnnee),
    domicileFinAnnee: parseFormInt(data.domicileFinAnnee),
    domicileMesuresNouvelles: parseFormInt(data.domicileMesuresNouvelles),
    domicileSortieMesures: parseFormInt(data.domicileSortieMesures),
    etablissementDebutAnnee: parseFormInt(data.etablissementDebutAnnee),
    etablissementFinAnnee: parseFormInt(data.etablissementFinAnnee),
    etablissementMesuresNouvelles: parseFormInt(
      data.etablissementMesuresNouvelles
    ),
    etablissementSortieMesures: parseFormInt(data.etablissementSortieMesures),
  };
}

export function EnqueteActiviteEtablissementDomicileForm(props) {
  const {
    title,
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    sections,
    enquete,
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

  const { submitForm, values, errors, showError, submit } = enqueteForm;

  const totalDebutAnnee =
    (values.etablissementDebutAnnee || 0) + (values.domicileDebutAnnee || 0);

  const totalFinAnnee =
    (values.etablissementFinAnnee || 0) + (values.domicileFinAnnee || 0);

  return (
    <form noValidate onSubmit={submitForm}>
      <HeadingTitle textAlign="center" mb={"50px"}>
        {enqueteContext.section.label}
      </HeadingTitle>

      {title && <Heading size={3}>{title}</Heading>}

      <Text mt={2} mb={1} fontWeight="bold" color="#595959">
        EN ÉTABLISSEMENT
      </Text>

      <EnqueteActiviteFormGroupMesures
        enqueteContext={enqueteContext}
        enqueteForm={enqueteForm}
        errors={errors}
        showError={showError}
        prefix="etablissement"
      />

      <Text mt={2} mb={1} fontWeight="bold" color="#595959">
        À DOMICILE
      </Text>

      <EnqueteActiviteFormGroupMesures
        enqueteContext={enqueteContext}
        enqueteForm={enqueteForm}
        errors={errors}
        showError={showError}
        prefix="domicile"
      />

      <Box sx={{ color: "#595959", fontWeight: "bold" }} mt={"50px"}>
        Soit un total de <Text sx={strongStyle}>{totalDebutAnnee}</Text> mesures
        au 01/01/{`${enquete.annee - 1}`} et de{" "}
        <Text sx={strongStyle}>{totalFinAnnee}</Text> mesures au 31/12/
        {`${enquete.annee - 1}`}.
      </Box>

      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </form>
  );
}

export default EnqueteActiviteEtablissementDomicileForm;
