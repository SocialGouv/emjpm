import { stdFormatter } from "@emjpm/core";
import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { Button } from "~/ui";

import { EnqueteAlreadySubmitted } from "./EnqueteAlreadySubmitted";
import {
  EnqueteStatusHalfStarIcon,
  EnqueteStatusInvalidIcon,
  EnqueteStatusStarIcon,
} from "./EnqueteIcons";

export const EnqueteSubmit = ({
  loading,
  enquete,
  enqueteReponse,
  goToFirstPage,
  submitEnqueteReponse,
}) => {
  const globalStatus = enqueteReponse.enquete_reponse_validation_status.global;

  return enqueteReponse.status !== "draft" ? (
    <EnqueteAlreadySubmitted enquete={enquete} goToFirstPage={goToFirstPage} />
  ) : (
    <Flex flexDirection="column" justifyContent="center">
      <HeadingTitle textAlign="center">Envoi de vos réponses</HeadingTitle>

      {globalStatus === "invalid" ? (
        <Box
          sx={{
            lineHeight: "30px",
            marginTop: 40,
            marginX: 50,
            textAlign: "left",
          }}
        >
          <Flex>
            <Box mr={2}>
              <EnqueteStatusInvalidIcon />
            </Box>
            <Text fontWeight="bold">Certaines réponses sont invalides.</Text>
          </Flex>
          <Text>
            Les rubriques à corriger sont indiquées à gauche de votre écran.
          </Text>
          {enquete.date_fin && (
            <Text>
              Vous avez jusqu’au {stdFormatter.formatDateUI(enquete.date_fin)}.
            </Text>
          )}
        </Box>
      ) : globalStatus === "empty" ? (
        <Box
          sx={{
            lineHeight: "30px",
            marginTop: 40,
            marginX: 50,
            textAlign: "left",
          }}
        >
          <Flex>
            <Box mr={2}>
              <EnqueteStatusStarIcon />
            </Box>
            <Text fontWeight="bold">
              {"Vous n'avez pas répondu à l'enquête."}
            </Text>
          </Flex>
          <Text>
            Les rubriques à renseigner sont indiquées à gauche de votre écran.
          </Text>
          {enquete.date_fin && (
            <Text>
              {"Vous avez jusqu’au "}
              <strong>{stdFormatter.formatDateUI(enquete.date_fin)}</strong>.
            </Text>
          )}
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              lineHeight: "30px",
              marginTop: 40,
              marginX: 50,
              textAlign: "left",
            }}
          >
            {globalStatus === "empty-half" ? (
              <Fragment>
                <Flex>
                  <Box mr={2}>
                    <EnqueteStatusHalfStarIcon />
                  </Box>
                  <Text fontWeight="bold">
                    {"Vous n'avez pas répondu à toutes les questions."}
                  </Text>
                </Flex>
                <Text>
                  Les rubriques à compléter sont indiquées à gauche de votre
                  écran.
                </Text>
                {enquete.date_fin && (
                  <Text>
                    {"Vous avez jusqu’au "}
                    <strong>
                      {stdFormatter.formatDateUI(enquete.date_fin)}
                    </strong>
                    .
                  </Text>
                )}
                <Text>
                  Si vous avez terminé, vous pouvez cependant envoyer vos
                  réponses maintenant.
                </Text>
                <Text>
                  Celles-ci seront transmises à votre direction régionale.
                </Text>
              </Fragment>
            ) : (
              <Fragment>
                <Text>
                  Vous avez répondu à toutes les questions de l’enquête.
                </Text>
                <Text>
                  Celles-ci seront transmises à votre direction régionale.
                </Text>
                {enquete.date_fin && (
                  <Text>
                    {"Vous avez jusqu’au "}
                    <strong>
                      {stdFormatter.formatDateUI(enquete.date_fin)}
                    </strong>
                    .
                  </Text>
                )}
              </Fragment>
            )}

            {loading === false && (
              <Box sx={{ textAlign: "center" }}>
                <Button
                  marginTop={4}
                  onClick={async () => {
                    await submitEnqueteReponse({
                      variables: {
                        enqueteId: enquete.id,
                      },
                    });
                  }}
                >
                  Envoyer mes réponses
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Flex>
  );
};
