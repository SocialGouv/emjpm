import React from "react";
import { Box, Button, Flex, Text } from "rebass";

export const EnqueteStepperButtons = props => {
  const { goToPrevPage } = props;
  return (
    <Flex mt={"80px"} alignItems="center" flexDirection="column">
      <Flex justifyContent>
        <Button onClick={() => goToPrevPage()} variant="outline">
          Précédent
        </Button>
        <Button ml={4} type="submit">
          Suivant
        </Button>
      </Flex>
      {/* <Box mt={3}>
        <Text color="#404040" sx={{ textDecoration: "underline" }} fontWeight="bold" mr={4}>
          {"Enregistrer et revenir plus tard"}
        </Text>
      </Box> */}
    </Flex>
  );
};

export default EnqueteStepperButtons;
