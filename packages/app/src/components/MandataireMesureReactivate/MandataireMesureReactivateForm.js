import { useMutation } from "@apollo/react-hooks";
import { Button, Heading3 } from "@emjpm/ui";
import Router from "next/router";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { MANDATAIRE, REACTIVATE_MESURE, RECALCULATE_MANDATAIRE_MESURES } from "./mutations";

export const MandataireMesureReactivateForm = (props) => {
  const { mesure } = props;

  const [recalculateMandataireMesures] = useMutation(RECALCULATE_MANDATAIRE_MESURES, {
    refetchQueries: [
      {
        query: MANDATAIRE,
        variables: { id: mesure.mandataireId },
      },
    ],
  });
  const [updateMesure] = useMutation(REACTIVATE_MESURE, {
    onCompleted: async () => {
      await recalculateMandataireMesures({ variables: { mandataire_id: mesure.mandataireId } });
    },
  });

  return (
    <Box p="5">
      <Box mb="3">
        <Heading3>Réouvrir la mesure</Heading3>
      </Box>
      <Box>
        <Text lineHeight="1.5">
          {`Si vous souhaitez réouvrir la mesure, cliquez sur le bouton "Réouvrir la mesure". Dans le cas contraire, cliquez sur le bouton "Annuler`}
        </Text>
      </Box>
      <Flex justifyContent="flex-end">
        <Box>
          <Button
            mr="2"
            variant="outline"
            onClick={() => {
              Router.push("/mandataires/mesures/[mesure_id]", `/mandataires/mesures/${mesure.id}`, {
                shallow: true,
              });
            }}
          >
            Annuler
          </Button>
        </Box>
        <Box>
          <Button
            onClick={async () => {
              await updateMesure();
              await Router.push(
                "/mandataires/mesures/[mesure_id]",
                `/mandataires/mesures/${mesure.id}`,
                {
                  shallow: true,
                }
              );
            }}
          >
            Réouvrir la mesure
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

MandataireMesureReactivateForm.propTypes = {
  currentMesure: PropTypes.number.isRequired,
};
