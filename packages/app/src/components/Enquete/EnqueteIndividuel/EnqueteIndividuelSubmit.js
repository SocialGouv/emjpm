import { Button, Heading1 } from "@emjpm/ui";
import { format } from "date-fns";
import React, { useMemo } from "react";
import { useMutation } from "react-apollo";
import { Box, Flex, Text } from "rebass";

import { SUBMIT_ENQUETE_INDIVIDUEL } from "./mutations";
import { ENQUETE_MANDATAIRE_INDIVIDUEL } from "./queries";

export const EnqueteIndividuelWelcome = props => {
  const { enquete, enqueteReponse } = props;

  const hasError = useMemo(() => {
    const keys = Object.keys(enqueteReponse);
    return keys
      .filter(key => key.indexOf("_status") !== -1)
      .some(key => {
        return keys[key] !== 2;
      });
  }, [enqueteReponse]);

  const [submitEnqueteIndividuel, { loading }] = useMutation(SUBMIT_ENQUETE_INDIVIDUEL, {
    refetchQueries: [
      {
        query: ENQUETE_MANDATAIRE_INDIVIDUEL,
        variables: { enqueteId: enquete.id }
      }
    ]
  });

  return (
    <Flex flexDirection="column" justifyContent="center">
      <Heading1 textAlign="center">{"Envoi de vos réponses"}</Heading1>

      {hasError ? (
        <Box sx={{ textAlign: "center", lineHeight: "30px", marginTop: 4 }}>
          <Text>Vous n’avez pas répondu à toutes les questions.</Text>
          <Text>Les rubriques à compléter sont indiquées à gauche de votre écran.</Text>
          {enquete.date_fin && (
            <Text>
              {"Vous avez jusqu’au "}
              <strong>{format(new Date(enquete.date_fin), "dd/MM/yyyy")}</strong>.
            </Text>
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
            <Button
              marginTop={4}
              loading={loading}
              onClick={async () => {
                await submitEnqueteIndividuel({
                  variables: {
                    id: enqueteReponse.enquete_reponses_id
                  }
                });
              }}
            >
              Envoyer
            </Button>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default EnqueteIndividuelWelcome;
