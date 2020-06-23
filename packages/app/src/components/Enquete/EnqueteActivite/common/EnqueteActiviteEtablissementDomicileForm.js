import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";
import { Box, Text } from "rebass";

import yup from "../../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormInt } from "../../../../util";
import { EnqueteStepperButtons } from "../../EnqueteStepperButtons";
import { useEnqueteForm } from "../../useEnqueteForm.hook";
import { buildMesureGroupsAttributes } from "./buildMesureGroupsAttributes";
import { EnqueteActiviteFormGroupMesures } from "./EnqueteActiviteFormGroupMesures";

const strongStyle = {
  display: "inline-block",
  fontWeight: "bold",
  color: "#007AD9",
};

// validation identique à celle de enqueteActiviteStatus
const validationSchema = yup.object(buildMesureGroupsAttributes(["etablissement", "domicile"]));

function dataToForm(data) {
  return {
    etablissementDebutAnnee: formatFormInput(data.etablissementDebutAnnee),
    etablissementFinAnnee: formatFormInput(data.etablissementFinAnnee),
    domicileDebutAnnee: formatFormInput(data.domicileDebutAnnee),
    domicileFinAnnee: formatFormInput(data.domicileFinAnnee),
    etablissementMesuresNouvelles: formatFormInput(data.etablissementMesuresNouvelles),
    etablissementSortieMesures: formatFormInput(data.etablissementSortieMesures),
    domicileMesuresNouvelles: formatFormInput(data.domicileMesuresNouvelles),
    domicileSortieMesures: formatFormInput(data.domicileSortieMesures),
  };
}

function formToData(data) {
  return {
    etablissementDebutAnnee: parseFormInt(data.etablissementDebutAnnee),
    etablissementFinAnnee: parseFormInt(data.etablissementFinAnnee),
    domicileDebutAnnee: parseFormInt(data.domicileDebutAnnee),
    domicileFinAnnee: parseFormInt(data.domicileFinAnnee),
    etablissementMesuresNouvelles: parseFormInt(data.etablissementMesuresNouvelles),
    etablissementSortieMesures: parseFormInt(data.etablissementSortieMesures),
    domicileMesuresNouvelles: parseFormInt(data.domicileMesuresNouvelles),
    domicileSortieMesures: parseFormInt(data.domicileSortieMesures),
  };
}

export const EnqueteActiviteEtablissementDomicileForm = (props) => {
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

  const { submitForm, values, errors, showError, submit } = enqueteForm;

  const totalDebutAnnee = (values.etablissementDebutAnnee || 0) + (values.domicileDebutAnnee || 0);

  const totalFinAnnee = (values.etablissementFinAnnee || 0) + (values.domicileFinAnnee || 0);

  return (
    <form onSubmit={submitForm}>
      <Heading1 textAlign="center" mb={"50px"}>
        {"Votre activité en 2019"}
      </Heading1>

      {title && <Heading3>{title}</Heading3>}

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
        Soit un total de <Text sx={strongStyle}>{totalDebutAnnee}</Text> mesures au 01/01/2019 et de{" "}
        <Text sx={strongStyle}>{totalFinAnnee}</Text> mesures au 31/12/2019.
      </Box>

      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </form>
  );
};

export default EnqueteActiviteEtablissementDomicileForm;
