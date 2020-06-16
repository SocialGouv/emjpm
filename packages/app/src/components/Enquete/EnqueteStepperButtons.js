import React, { Fragment } from "react";
import { Button, Flex } from "rebass";

export const EnqueteStepperButtons = props => {
  const { submit, disabled = false } = props;
  return (
    <Flex mt={"80px"} alignItems="center" flexDirection="column">
      <Flex justifyContent>
        <Fragment>
          <Button
            disabled={disabled}
            onClick={e => {
              e.preventDefault();
              if (submit) {
                submit({ action: "click-previous" });
              }
            }}
            variant="outline"
          >
            Précédent
          </Button>
          <Button
            disabled={disabled}
            onClick={e => {
              e.preventDefault();
              if (submit) {
                submit({ action: "click-next" });
              }
            }}
            ml={4}
          >
            Suivant
          </Button>
        </Fragment>
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
