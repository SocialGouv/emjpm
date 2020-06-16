import { useQuery } from "@apollo/react-hooks";
import { Card } from "@emjpm/ui";
import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";

import { ENQUETES } from "./queries";

export const Enquetes = () => {
  const { data, loading } = useQuery(ENQUETES);

  if (loading) {
    return <Box p={2}>Chargement...</Box>;
  }

  const { enquetes } = data;
  return (
    <Fragment>
      {enquetes.map((enquete) => {
        return (
          <Card mb={1} key={enquete.id}>
            <Flex alignItems="center" justifyContent="flex-start">
              <Text fontWeight="bold" color="primary">
                {`Enquête ${enquete.annee} sur l'activité de ${enquete.annee - 1}`}
              </Text>
              <Text fontWeight="bold" pl={5}>{`Du ${new Date(
                enquete.created_at
              ).toLocaleDateString()} au ${new Date(enquete.date_fin).toLocaleDateString()}`}</Text>
              <Text
                fontSize={1}
                pl={5}
              >{`durant cette période le formulaire est visible dans l'espace des mandataires.`}</Text>
            </Flex>
          </Card>
        );
      })}
    </Fragment>
  );
};

export default Enquetes;
