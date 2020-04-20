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
      {enquetes.map(enquete => {
        return (
          <Card mb={1} key={enquete.id}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text>{enquete.annee}</Text>
              {enquete.date_fin && (
                <Text>{`Du ${new Date(enquete.created_at).toLocaleDateString()} au ${new Date(
                  enquete.date_fin
                ).toLocaleDateString()}`}</Text>
              )}
            </Flex>
          </Card>
        );
      })}
    </Fragment>
  );
};

export default Enquetes;
