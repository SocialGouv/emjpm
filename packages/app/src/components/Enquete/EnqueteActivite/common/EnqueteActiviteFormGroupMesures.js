import { Field, InlineError, Input } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex } from "rebass";

export const EnqueteActiviteFormGroupMesures = props => {
  // prefix: 'etablissement' | 'domicile' | ''
  const { values, errors, handleChange, prefix, showError } = props;

  const idDebutAnnee = prefix ? `${prefix}DebutAnnee` : "debutAnnee";
  const idFinAnnee = prefix ? `${prefix}FinAnnee` : "finAnnee";
  const idMesuresNouvelles = prefix ? `${prefix}MesuresNouvelles` : "mesuresNouvelles";
  const idSortieMesures = prefix ? `${prefix}SortieMesures` : "sortieMesures";
  const idSomme = prefix ? `${prefix}Somme` : "somme";

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
                hasError={showError && !!errors[idDebutAnnee]}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError
              showError={showError}
              message={errors[idDebutAnnee]}
              fieldId={idDebutAnnee}
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
                id={idFinAnnee}
                name={idFinAnnee}
                value={values[idFinAnnee]}
                hasError={showError && (!!errors[idFinAnnee] || !!errors[idSomme])}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError showError={showError} message={errors[idFinAnnee]} fieldId={idFinAnnee} />
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
                hasError={showError && !!errors[idMesuresNouvelles]}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError
              showError={showError}
              message={errors[idMesuresNouvelles]}
              fieldId={idMesuresNouvelles}
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
                id={idSortieMesures}
                name={idSortieMesures}
                value={values[idSortieMesures]}
                hasError={showError && !!errors[idSortieMesures]}
                onChange={handleChange}
                type="number"
              />
            </Box>
            <InlineError
              showError={showError}
              message={errors[idSortieMesures]}
              fieldId={idSortieMesures}
            />
          </Field>
        </Box>
      </Flex>
      <InlineError showError={showError} message={errors[idSomme]} fieldId={idSomme} />
    </Box>
  );
};

export default EnqueteActiviteFormGroupMesures;
