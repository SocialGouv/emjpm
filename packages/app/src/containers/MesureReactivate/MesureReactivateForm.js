import { Box, Flex, Text } from "rebass";

import { Button, Heading } from "~/components";

export function MesureReactivateForm(props) {
  const { handleSubmit, handleCancel } = props;

  return (
    <Box p="5">
      <Box mb="3">
        <Heading size={3}>Réouvrir la mesure</Heading>
      </Box>
      <Box>
        <Text lineHeight="1.5">
          {
            'Si vous souhaitez réouvrir la mesure, cliquez sur le bouton "Réouvrir la mesure". Dans le cas contraire, cliquez sur le bouton "Annuler'
          }
        </Text>
      </Box>
      <Flex justifyContent="flex-end">
        <Box>
          <Button mr="2" variant="outline" onClick={handleCancel}>
            Annuler
          </Button>
        </Box>
        <Box>
          <Button onClick={handleSubmit}>Réouvrir la mesure</Button>
        </Box>
      </Flex>
    </Box>
  );
}
