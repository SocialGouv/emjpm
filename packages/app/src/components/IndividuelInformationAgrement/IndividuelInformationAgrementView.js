import { Button, Heading4 } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

import { YES_NO_OPTIONS } from "../../constants/mandataire";
import { FieldLabelValue, getLabel } from "../IndividuelInformationCommon";

const IndividuelInformationAgrementView = props => {
  const { agrement, handleEdit } = props;
  return (
    <Fragment>
      <Box>
        <Heading4 pb={1}>{`Début de votre activité`}</Heading4>
        <FieldLabelValue
          label="Votre activité de mandataire a-t-elle a-t-elle débuté avant 2009?"
          value={getLabel(agrement.debut_activite_avant_2009, YES_NO_OPTIONS)}
        />
        {agrement.debut_activite_avant_2009 && (
          <FieldLabelValue
            label="Année de début de votre activité"
            value={getLabel(agrement.annee_debut_activite)}
          />
        )}
      </Box>
      <Box>
        <Heading4 pb={1}>{`Votre agrément`}</Heading4>
        <FieldLabelValue
          label="Année d'obtention de votre agrément"
          value={getLabel(agrement.annee_agrement)}
          property="annee_agrement"
        />
      </Box>
      <Flex mt="5">
        <Box>
          <Button onClick={handleEdit}>Modifier</Button>
        </Box>
      </Flex>
    </Fragment>
  );
};

export { IndividuelInformationAgrementView };
