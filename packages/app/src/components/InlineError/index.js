import { Exclamation } from "@styled-icons/evil/Exclamation";
import PropTypes from "prop-types";

import { Flex, Text } from "rebass";

function InlineError({ message, fieldId, showError, ...props }) {
  return (
    showError !== false &&
    message && (
      <Flex
        id={`error-${fieldId}`}
        aria-describedby={fieldId}
        alignItems="center"
        color="error"
        {...props}
      >
        <Exclamation size="18" />
        <Text mx="1" fontSize="12px">
          {message}
        </Text>
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
