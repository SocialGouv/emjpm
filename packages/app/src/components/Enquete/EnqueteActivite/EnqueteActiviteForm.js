import { Field, Heading1, Heading3, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Box, Flex, Text } from "rebass";

import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

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

export const EnqueteActiviteForm = props => {
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

      <Text my={4} fontWeight="bold" color="#595959">
        EN ÉTABLISSEMENT
      </Text>

      <Flex>
        <Box width="50%">
          <Field>
            <Label width="auto">Mesures au 1er janvier</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id="etablissementDebutAnnee"
                name="etablissementDebutAnnee"
                value={values.etablissementDebutAnnee}
                hasError={!!errors.etablissementDebutAnnee}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError
              message={errors.etablissementDebutAnnee}
              fieldId="etablissementDebutAnnee"
            />
          </Field>
        </Box>
        <Box width="50%">
          <Field>
            <Label width="auto">Mesures au 31 décembre</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id="etablissementFinAnnee"
                name="etablissementFinAnnee"
                value={values.etablissementFinAnnee}
                hasError={!!errors.etablissementFinAnnee}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError message={errors.etablissementFinAnnee} fieldId="etablissementFinAnnee" />
          </Field>
        </Box>
      </Flex>
      <Flex>
        <Box width="50%">
          <Field>
            <Label width="auto">Nouvelles mesures</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id="etablissementMesuresNouvelles"
                name="etablissementMesuresNouvelles"
                value={values.etablissementMesuresNouvelles}
                hasError={!!errors.etablissementMesuresNouvelles}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError
              message={errors.etablissementMesuresNouvelles}
              fieldId="etablissementMesuresNouvelles"
            />
          </Field>
        </Box>
        <Box width="50%">
          <Field>
            <Label width="auto">Sortie de mesures</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id="etablissementSortieMesures"
                name="etablissementSortieMesures"
                value={values.etablissementSortieMesures}
                hasError={!!errors.etablissementSortieMesures}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError
              message={errors.etablissementSortieMesures}
              fieldId="etablissementSortieMesures"
            />
          </Field>
        </Box>
      </Flex>
      <Box sx={{ color: "#595959", fontSize: "13px", fontWeight: "bold" }}>
        {"Soit une différence de  "}
        <Text sx={strongStyle}>
          {(values.etablissementDebutAnnee || 0) - (values.etablissementFinAnnee || 0)}
        </Text>
        {" ."}
      </Box>

      <Text my={4} fontWeight="bold" color="#595959">
        À DOMICILE
      </Text>

      <Flex>
        <Box width="50%">
          <Field>
            <Label width="auto">Mesures au 1er janvier</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id="domicileDebutAnnee"
                name="domicileDebutAnnee"
                value={values.domicileDebutAnnee}
                hasError={!!errors.domicileDebutAnnee}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError message={errors.domicileDebutAnnee} fieldId="domicileDebutAnnee" />
          </Field>
        </Box>
        <Box width="50%">
          <Field>
            <Label width="auto">Mesures au 31 décembre</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id="domicileFinAnnee"
                name="domicileFinAnnee"
                value={values.domicileFinAnnee}
                hasError={!!errors.domicileFinAnnee}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError message={errors.domicileFinAnnee} fieldId="domicileFinAnnee" />
          </Field>
        </Box>
      </Flex>
      <Flex>
        <Box width="50%">
          <Field>
            <Label width="auto">Nouvelles mesures</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id="domicileMesuresNouvelles"
                name="domicileMesuresNouvelles"
                value={values.domicileMesuresNouvelles}
                hasError={!!errors.domicileMesuresNouvelles}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError
              message={errors.domicileMesuresNouvelles}
              fieldId="domicileMesuresNouvelles"
            />
          </Field>
        </Box>
        <Box width="50%">
          <Field>
            <Label width="auto">Sortie de mesures</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id="domicileSortieMesures"
                name="domicileSortieMesures"
                value={values.domicileSortieMesures}
                hasError={!!errors.domicileSortieMesures}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError message={errors.domicileSortieMesures} fieldId="domicileSortieMesures" />
          </Field>
        </Box>
      </Flex>
      <Box sx={{ color: "#595959", fontSize: "13px", fontWeight: "bold" }}>
        {"Soit une différence de  "}
        <Text sx={strongStyle}>
          {(values.domicileDebutAnnee || 0) - (values.domicileFinAnnee || 0)}
        </Text>
        {" ."}
      </Box>
      <Box sx={{ color: "#595959", fontWeight: "bold" }} mt={"50px"}>
        Soit un total de <Text sx={strongStyle}>{totalDebutAnnee}</Text> mesures au 01/01/2019 et de{" "}
        <Text sx={strongStyle}>{totalFinAnnee}</Text> mesures au 31/12/2019.
      </Box>

      <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnqueteActiviteForm;
