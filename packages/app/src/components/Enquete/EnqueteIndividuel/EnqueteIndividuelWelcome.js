import { Heading1 } from "@emjpm/ui";
import { format } from "date-fns";
import React, { Fragment } from "react";
import { Box, Button, Flex, Text } from "rebass";

import { LinkButton } from "../../../components/Commons";

export const EnqueteIndividuelWelcome = props => {
  const { goToNextPage, enquete } = props;
  const { id: enqueteId } = enquete;
  return (
    <Flex flexDirection="column" justifyContent="center">
      <Heading1 textAlign="center">Bienvenue,</Heading1>

      <Box sx={{ textAlign: "center", lineHeight: "30px", marginTop: 4 }}>
        <Text>
          Vous pouvez revenir à tout moment la compléter
          {enquete.date_fin && (
            <Fragment>, jusqu’au {format(new Date(enquete.date_fin), "dd/MM/yyyy")}</Fragment>
          )}
          .
        </Text>
        <Text>Vous pouvez appuyer sur la touche tab d’une cellule à une autre.</Text>
      </Box>

      <Flex flexDirection="row" justifyContent="space-between" mt="80px">
        <Button onClick={() => goToNextPage()} mx="auto">
          Répondre
        </Button>
        <LinkButton
          mx="auto"
          pt={15}
          href={`/mandataires/enquetes/[enquete_id]/import`}
          asLink={`/mandataires/enquetes/${enqueteId}/import`}
        >
          Importez votre enquête
        </LinkButton>
      </Flex>
    </Flex>
  );
};

export default EnqueteIndividuelWelcome;
