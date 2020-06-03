import { Heading1 } from "@emjpm/ui";
import { format } from "date-fns";
import React from "react";
import { Box, Button, Flex, Text } from "rebass";

import { LinkButton } from "../../../components/Commons";

const textStyle = {
  textAlign: "center",
  lineHeight: "30px"
};

export const EnqueteIndividuelWelcome = props => {
  const { goToNextPage, enquete } = props;
  const { id: enqueteId } = enquete;
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb="5">
        <Heading1 textAlign="center">Bienvenue</Heading1>
        <Flex flexDirection="column" mt="4" mb="3" sx={textStyle}>
          <Text>Vous pouvez revenir à tout moment compléter le formulaire</Text>
          <Text sx={{ fontWeight: "700" }}>
            jusqu’au {format(new Date(enquete.date_fin), "dd/MM/yyyy")}.
          </Text>
          <Text>Vous pouvez appuyer sur la touche tab pour passer d’un champ à un autre.</Text>
        </Flex>
        <Button onClick={() => goToNextPage()} mx="auto">
          Répondre
        </Button>
      </Flex>
      <Flex flexDirection="column">
        <Box mt="4" mb="3" sx={textStyle}>
          <Text>
            {`Vous avez déjà rempli le fichier excel envoyé par votre direction départementale?`}
          </Text>
        </Box>
        <LinkButton
          mx="auto"
          pt={15}
          href={`/mandataires/enquetes/[enquete_id]/import`}
          asLink={`/mandataires/enquetes/${enqueteId}/import`}
          outline
        >
          Importez votre enquête
        </LinkButton>
      </Flex>
    </Flex>
  );
};

export default EnqueteIndividuelWelcome;
