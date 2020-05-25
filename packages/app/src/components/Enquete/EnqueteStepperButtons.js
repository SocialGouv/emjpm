import React from "react";
import { Button, Flex } from "rebass";

export const EnqueteStepperButtons = props => {
  const { goToPrevPage, disabled = false } = props;
  return (
    <Flex mt={"80px"} alignItems="center" flexDirection="column">
      <Flex justifyContent>
        <Button disabled={disabled} onClick={() => goToPrevPage()} variant="outline">
          Précédent
        </Button>
        <Button disabled={disabled} ml={4} type="submit">
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
