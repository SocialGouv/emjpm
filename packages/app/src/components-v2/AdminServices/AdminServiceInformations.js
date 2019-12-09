import { useQuery } from "@apollo/react-hooks";
import { Card, Text } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex } from "rebass";

import { SERVICE } from "./queries";
// import { getAdminServiceDetails } from "./util";

const AdminServiceInformations = props => {
  const { serviceId } = props;
  const { data, loading, error } = useQuery(SERVICE, { variables: { serviceId } });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const [service] = data.services;
  const { id, etablissement, code_postal, ville } = service;
  // const details = getAdminUserDetails(user);

  return (
    <Card>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          ID
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{id}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Etablissement
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{etablissement}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Code postal
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{code_postal}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          ville
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{ville}</Text>
        </Box>
      </Flex>
    </Card>
  );
};

export { AdminServiceInformations };
