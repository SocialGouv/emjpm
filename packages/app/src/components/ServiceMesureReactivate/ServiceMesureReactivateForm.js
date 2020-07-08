import { useMutation } from "@apollo/react-hooks";
import { Button, Heading3 } from "@emjpm/ui";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { REACTIVATE_MESURE, RECALCULATE_SERVICE_MESURES } from "../ServiceMesures/mutations";
import { SERVICE } from "../ServiceMesures/queries";

export const ServiceMesureReactivateForm = (props) => {
  const { mesure } = props;
  const [recalculateServiceMesures] = useMutation(RECALCULATE_SERVICE_MESURES, {
    refetchQueries: [
      {
        query: SERVICE,
        variables: { id: mesure.serviceId },
      },
    ],
  });
  const [updateMesure] = useMutation(REACTIVATE_MESURE, {
    onCompleted: async () => {
      await recalculateServiceMesures({ variables: { service_id: mesure.serviceId } });
    },
  });

  const onSubmit = async () => {
    await updateMesure({
      refetchQueries: ["mesures", "mesures_aggregate"],
      variables: {
        id: mesure.id,
      },
    });
    await Router.push("/services/mesures/[mesure_id]", `/services/mesures/${mesure.id}`, {
      shallow: true,
    });
  };

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
              Router.push("/services/mesures/[mesure_id]", `/services/mesures/${mesure.id}`, {
                shallow: true,
              });
            }}
          >
            Annuler
          </Button>
        </Box>
        <Box>
          <Button onClick={onSubmit}>Réouvrir la mesure</Button>
        </Box>
      </Flex>
    </Box>
  );
};
