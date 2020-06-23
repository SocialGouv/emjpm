import React from "react";
import { Box, Flex } from "rebass";

import { EnqueteFormInputField } from "../../EnqueteForm";

export const EnqueteActiviteFormGroupMesures = (props) => {
  // prefix: 'etablissement' | 'domicile' | ''
  const { prefix, enqueteContext, enqueteForm } = props;

  const idDebutAnnee = prefix ? `${prefix}DebutAnnee` : "debutAnnee";
  const idFinAnnee = prefix ? `${prefix}FinAnnee` : "finAnnee";
  const idMesuresNouvelles = prefix ? `${prefix}MesuresNouvelles` : "mesuresNouvelles";
  const idSortieMesures = prefix ? `${prefix}SortieMesures` : "sortieMesures";

  return (
    <Box mt={2}>
      <Flex>
        <Box width={1 / 2}>
          <EnqueteFormInputField
            id={idDebutAnnee}
            label="Mesures au 1er janvier"
            type="number"
            min={0}
            size="medium"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Box>
        <Box width={1 / 2}>
          <EnqueteFormInputField
            id={idFinAnnee}
            label="Mesures au 31 décembre"
            type="number"
            min={0}
            size="medium"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Box>
      </Flex>
      <Flex>
        <Box width={1 / 2}>
          <EnqueteFormInputField
            id={idMesuresNouvelles}
            label="Nouvelles mesures"
            type="number"
            min={0}
            size="medium"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Box>
        <Box width={1 / 2}>
          <EnqueteFormInputField
            id={idSortieMesures}
            label="Sortie de mesures"
            type="number"
            min={0}
            size="medium"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default EnqueteActiviteFormGroupMesures;
