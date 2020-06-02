import { Field, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex, Text } from "rebass";

const strongStyle = {
  display: "inline-block",
  fontWeight: "bold",
  color: "#007AD9"
};
export const EnqueteActiviteFormGroupMesures = props => {
  // prefix: 'etablissement' | 'domicile' | ''
  const { values, errors, handleChange, prefix } = props;

  const idDebutAnnee = prefix ? `${prefix}DebutAnnee` : "debutAnnee";
  const idFinAnnee = prefix ? `${prefix}FinAnnee` : "finAnnee";
  const idMesuresNouvelles = prefix ? `${prefix}MesuresNouvelles` : "mesuresNouvelles";
  const idSortieMesures = prefix ? `${prefix}SortieMesures` : "sortieMesures";

  return (
    <Box mt={2}>
      <Flex>
        <Box width="50%">
          <Field>
            <Label width="auto">Mesures au 1er janvier</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id={idDebutAnnee}
                name={idDebutAnnee}
                value={values[idDebutAnnee]}
                hasError={!!errors[idDebutAnnee]}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError message={errors[idDebutAnnee]} fieldId={idDebutAnnee} />
          </Field>
        </Box>
        <Box width="50%">
          <Field>
            <Label width="auto">Mesures au 31 décembre</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id={idFinAnnee}
                name={idFinAnnee}
                value={values[idFinAnnee]}
                hasError={!!errors[idFinAnnee]}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError message={errors[idFinAnnee]} fieldId={idFinAnnee} />
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
                id={idMesuresNouvelles}
                name={idMesuresNouvelles}
                value={values[idMesuresNouvelles]}
                hasError={!!errors[idMesuresNouvelles]}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError message={errors[idMesuresNouvelles]} fieldId={idMesuresNouvelles} />
          </Field>
        </Box>
        <Box width="50%">
          <Field>
            <Label width="auto">Sortie de mesures</Label>
            <Box width="200px">
              <Input
                placeholder=""
                min={0}
                id={idSortieMesures}
                name={idSortieMesures}
                value={values[idSortieMesures]}
                hasError={!!errors[idSortieMesures]}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError message={errors[idSortieMesures]} fieldId={idSortieMesures} />
          </Field>
        </Box>
      </Flex>
      <Box sx={{ color: "#595959", fontSize: "13px", fontWeight: "bold" }}>
        {"Soit une différence de  "}
        <Text sx={strongStyle}>{(values[idDebutAnnee] || 0) - (values[idFinAnnee] || 0)}</Text>
        {" ."}
      </Box>
    </Box>
  );
};

export default EnqueteActiviteFormGroupMesures;
