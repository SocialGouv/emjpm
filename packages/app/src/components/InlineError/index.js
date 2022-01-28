import { Exclamation } from "@styled-icons/evil/Exclamation";
import PropTypes from "prop-types";

import { Flex, Box, Text } from "rebass";

function InlineError({ message, fieldId, showError, ...props }) {
  return (
    showError !== false &&
    message && (
      <Flex
        id={`error-${fieldId}`}
        alignItems="center"
        color="error"
        {...props}
        role="status"
      >
        <Box style={{ minWidth: "18px" }}>
          <Exclamation size="18" />
        </Box>
        <Box>
          <Text
            mx="1"
            fontSize="12px"
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {message}
          </Text>
        </Box>
      </Flex>
    )
  );
}

InlineError.defaultProps = {
  message: "",
  showError: true,
};

InlineError.propTypes = {
  fieldId: PropTypes.string.isRequired,
  message: PropTypes.string,
  showError: PropTypes.bool,
};

export default InlineError;
