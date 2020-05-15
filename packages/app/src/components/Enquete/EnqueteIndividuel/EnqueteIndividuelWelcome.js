import { Heading1 } from "@emjpm/ui";
import React from "react";
import { Box, Button, Flex, Text } from "rebass";

export const EnqueteIndividuelWelcome = props => {
  const { goToNextPage } = props;
  return (
    <Flex flexDirection="column" justifyContent="center">
      <Heading1 textAlign="center">Bienvenue,</Heading1>

      <Box sx={{ textAlign: "center", lineHeight: "30px", marginTop: 4 }}>
        <Text>Vous pouvez revenir à tout moment la compléter, jusqu’au JJ/MM/AAAA.</Text>
        <Text>Vous pouvez appuyer sur la touche tab d’une cellule à une autre.</Text>
      </Box>

      <Button onClick={() => goToNextPage()} mx="auto" mt="80px">
        Répondre
      </Button>
    </Flex>
  );
};

export default EnqueteIndividuelWelcome;
