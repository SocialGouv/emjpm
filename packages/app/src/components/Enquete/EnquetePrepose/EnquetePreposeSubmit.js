import { Heading1 } from "@emjpm/ui";
import { format } from "date-fns";
import React from "react";
import { Box, Flex, Text } from "rebass";

export const EnquetePreposeSubmit = props => {
  const { enquete, enqueteReponse } = props;
  const hasError = enqueteReponse.enquete_reponse_status.global !== "valid";
  // const { enquete_reponse_ids } = enqueteReponse;

  return (
    <Flex flexDirection="column" justifyContent="center">
      <Heading1 textAlign="center">Envoi de vos réponses</Heading1>

      {hasError && (
        <Box sx={{ textAlign: "center", lineHeight: "30px", marginTop: 4 }}>
          <Text>Vous n’avez pas répondu à toutes les questions.</Text>
          <Text>Les rubriques à compléter sont indiquées à gauche de votre écran.</Text>
          {enquete.date_fin && (
            <Text>Vous avez jusqu’au {format(new Date(enquete.date_fin), "dd/MM/yyyy")}.</Text>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default EnquetePreposeSubmit;
