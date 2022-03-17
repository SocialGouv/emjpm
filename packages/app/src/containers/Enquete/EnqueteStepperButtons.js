import { Button, Flex } from "rebass";

export function EnqueteStepperButtons(props) {
  const { submit, disabled = false } = props;
  return (
    <Flex mt={"80px"} alignItems="center" flexDirection="column">
      <Flex justifyContent>
        <>
          <Button
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();
              if (submit) {
                submit({ action: "click-previous" });
              }
            }}
            variant="outline"
            title="Précédent"
            aria-label="Précédent"
          >
            Précédent
          </Button>
          <Button
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();
              if (submit) {
                submit({ action: "click-next" });
              }
            }}
            ml={4}
            title="Suivant"
            aria-label="Suivant"
          >
            Suivant
          </Button>
        </>
      </Flex>
      {/* <Box mt={3}>
        <Text color="#404040" sx={{ textDecoration: "underline" }} fontWeight="bold" mr={4}>
          {"Enregistrer et revenir plus tard"}
        </Text>
      </Box> */}
    </Flex>
  );
}

export default EnqueteStepperButtons;
