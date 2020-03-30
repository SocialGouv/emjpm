import { useQuery } from "@apollo/react-hooks";
import { Text } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { EDITOR } from "./queries";

const AdminEditorInformations = props => {
  const { userId } = props;
  const { data, loading, error } = useQuery(EDITOR, { variables: { userId } });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const [editor] = data.editors;
  const { id, name, api_token } = editor;

  return (
    <Box>
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
          Nom
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{name}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          API Token
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{api_token}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export { AdminEditorInformations };
