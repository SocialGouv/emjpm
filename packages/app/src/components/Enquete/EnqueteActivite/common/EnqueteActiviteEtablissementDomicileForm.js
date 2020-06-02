import { Heading1, Heading3 } from "@emjpm/ui";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Box, Text } from "rebass";

import { EnqueteStepperButtons } from "../../EnqueteStepperButtons";
import { EnqueteActiviteFormGroupMesures } from "./EnqueteActiviteFormGroupMesures";

const strongStyle = {
  display: "inline-block",
  fontWeight: "bold",
  color: "#007AD9"
};

function mapDataPropsToFormValues(data) {
  return {
    etablissementDebutAnnee: data.etablissementDebutAnnee || "",
    etablissementFinAnnee: data.etablissementFinAnnee || "",
    domicileDebutAnnee: data.domicileDebutAnnee || "",
    domicileFinAnnee: data.domicileFinAnnee || "",
    etablissementMesuresNouvelles: data.etablissementMesuresNouvelles || "",
    etablissementSortieMesures: data.etablissementSortieMesures || "",
    domicileMesuresNouvelles: data.domicileMesuresNouvelles || "",
    domicileSortieMesures: data.domicileSortieMesures || ""
  };
}

function mapFormValuesToSubmit(data) {
  return {
    etablissementDebutAnnee: parseIntToSubmit(data.etablissementDebutAnnee),
    etablissementFinAnnee: parseIntToSubmit(data.etablissementFinAnnee),
    domicileDebutAnnee: parseIntToSubmit(data.domicileDebutAnnee),
    domicileFinAnnee: parseIntToSubmit(data.domicileFinAnnee),
    etablissementMesuresNouvelles: parseIntToSubmit(data.etablissementMesuresNouvelles),
    etablissementSortieMesures: parseIntToSubmit(data.etablissementSortieMesures),
    domicileMesuresNouvelles: parseIntToSubmit(data.domicileMesuresNouvelles),
    domicileSortieMesures: parseIntToSubmit(data.domicileSortieMesures)
  };

  function parseIntToSubmit(value) {
    return value ? parseInt(value) : undefined;
  }
}

export const EnqueteActiviteEtablissementDomicileForm = props => {
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

  const totalDebutAnnee = (values.etablissementDebutAnnee || 0) + (values.domicileDebutAnnee || 0);

  const totalFinAnnee = (values.etablissementFinAnnee || 0) + (values.domicileFinAnnee || 0);

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Votre activité"}
      </Heading1>

      {title && <Heading3>{title}</Heading3>}

      <Text mt={2} mb={1} fontWeight="bold" color="#595959">
        EN ÉTABLISSEMENT
      </Text>

      <EnqueteActiviteFormGroupMesures
        values={values}
        errors={errors}
        handleChange={handleChange}
        prefix="etablissement"
      />

      <Text mt={2} mb={1} fontWeight="bold" color="#595959">
        À DOMICILE
      </Text>

      <EnqueteActiviteFormGroupMesures
        values={values}
        errors={errors}
        handleChange={handleChange}
        prefix="domicile"
      />

      <Box sx={{ color: "#595959", fontWeight: "bold" }} mt={"50px"}>
        Soit un total de <Text sx={strongStyle}>{totalDebutAnnee}</Text> mesures au 01/01/2019 et de{" "}
        <Text sx={strongStyle}>{totalFinAnnee}</Text> mesures au 31/12/2019.
      </Box>

      <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnqueteActiviteEtablissementDomicileForm;
