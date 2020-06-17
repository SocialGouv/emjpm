import { Heading1 } from "@emjpm/ui";
import { format } from "date-fns";
import React from "react";
import { Box, Button, Flex, Text } from "rebass";

import { LinkButton } from "../../../components/Commons";
import { EnqueteAlreadySubmitted } from "./EnqueteAlreadySubmitted";

const textStyle = {
  textAlign: "center",
  lineHeight: "30px",
};
export const EnqueteWelcome = ({ goToFirstPage, enquete, enqueteReponse, pathPrefix }) => {
  const { id: enqueteId } = enquete;
  return enqueteReponse.status !== "draft" ? (
    <EnqueteAlreadySubmitted enquete={enquete} goToFirstPage={goToFirstPage} />
  ) : (
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
        <Button onClick={() => goToFirstPage()} mx="auto">
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
          href={`${pathPrefix}/[enquete_id]/import`}
          asLink={`${pathPrefix}/${enqueteId}/import`}
          outline
        >
          Importez votre enquête
        </LinkButton>
      </Flex>
    </Flex>
  );
};
