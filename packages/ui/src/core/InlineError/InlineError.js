import { Exclamation } from '@styled-icons/evil/Exclamation';
import PropTypes from 'prop-types';
import React from 'react';
import { Flex, Text } from 'rebass';

const InlineError = ({ message, fieldId, showError }) => {
  return (
    showError !== false && message && (
      <Flex id={fieldId} alignItems="center" pt="1" color="error">
        <Exclamation size="20" />
        <Text mx="1" fontSize="1">
          {message}
        </Text>
      </Flex>
    )
  );
};

InlineError.defaultProps = {
  message: '',
  showError: true,
};

InlineError.propTypes = {
  fieldId: PropTypes.string.isRequired,
  message: PropTypes.string,
  showError: PropTypes.bool,
};

export { InlineError };
