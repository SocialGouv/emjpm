import { Heading1 } from "@emjpm/ui";
import React from "react";
import { Box, Button, Text } from "rebass";

export const EnqueteAlreadySubmitted = ({ enquete, goToFirstPage }) => {
  return (
    <Box py={"50px"}>
      <Heading1 textAlign="center">
        Vos réponses à l’enquête {enquete.annee} ont bien été envoyées.
      </Heading1>
      <Box sx={{ lineHeight: "30px", marginTop: 4, textAlign: "center" }}>
        <Text>
          Nous vous remercions pour le temps que vous nous avez accordé.
        </Text>
      </Box>
      <Box>
        <Box sx={{ lineHeight: "30px", marginTop: 4, textAlign: "center" }}>
          <Text>
            Pour visualiser vos réponses, cliquez sur le bouton suivant:
          </Text>
          <Button onClick={() => goToFirstPage()} mx="auto" mt={30}>
            Visualiser mes réponses
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
