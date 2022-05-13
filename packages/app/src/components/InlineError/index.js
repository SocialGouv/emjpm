import { Exclamation } from "@styled-icons/evil/Exclamation";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { Flex, Box, Text } from "rebass";

const StyledExclamation = styled(Exclamation)`
  color: #df1400;
`;

function InlineError({ message, fieldId, showError, ...props }) {
  return (
    showError !== false &&
    message && (
      <Flex
        alignItems="center"
        id={`error-${fieldId}`}
        color="error"
        {...props}
      >
        <Box style={{ minWidth: "18px" }}>
          <StyledExclamation size="18" />
        </Box>
        <Box>
          <Text
            mx="1"
            fontSize="12px"
            style={{
              whiteSpace: "pre-line",
            }}
            role="alert"
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
