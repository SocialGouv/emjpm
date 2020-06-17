import { Button, Heading1 } from "@emjpm/ui";
import { format } from "date-fns";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { EnqueteAlreadySubmitted } from "./EnqueteAlreadySubmitted";

export const EnqueteSubmit = ({
  loading,
  enquete,
  enqueteReponse,
  goToFirstPage,
  submitEnqueteReponse,
}) => {
  const hasError = enqueteReponse.enquete_reponse_validation_status.global !== "valid";
  const { enquete_reponse_ids } = enqueteReponse;

  return enqueteReponse.status !== "draft" ? (
    <EnqueteAlreadySubmitted enquete={enquete} goToFirstPage={goToFirstPage} />
  ) : (
    <Flex flexDirection="column" justifyContent="center">
      <Heading1 textAlign="center">Envoi de vos réponses</Heading1>

      {hasError ? (
        <Box sx={{ textAlign: "center", lineHeight: "30px", marginTop: 4 }}>
          <Text>Vous n’avez pas répondu à toutes les questions.</Text>
          <Text>Les rubriques à compléter sont indiquées à gauche de votre écran.</Text>
          {enquete.date_fin && (
            <Text>Vous avez jusqu’au {format(new Date(enquete.date_fin), "dd/MM/yyyy")}.</Text>
          )}
        </Box>
      ) : (
        <Box>
          <Box sx={{ textAlign: "center", lineHeight: "30px", marginTop: 4 }}>
            <Text>Vous avez répondu à toutes les questions de l’enquête.</Text>
            <Text>Celles-ci seront transmises à votre direction régionale</Text>
            {enquete.date_fin && (
              <Text>
                {"Vous avez jusqu’au "}
                <strong>{format(new Date(enquete.date_fin), "dd/MM/yyyy")}</strong>.
              </Text>
            )}
            {loading === false && (
              <Button
                marginTop={4}
                onClick={async () => {
                  await submitEnqueteReponse({
                    variables: {
                      id: enquete_reponse_ids.id,
                    },
                  });
                }}
              >
                Envoyer
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Flex>
  );
};
