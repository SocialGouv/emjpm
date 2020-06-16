import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Box } from 'rebass';

import { labelStyle, textareaStyle } from './style';

const Textarea = (props) => {
  const [isFocused, setFocus] = useState(false);

  const { id, error, onChange, onFocus, onBlur, label, placeholder, value } = props;

  return (
    <Box mb="2">
      <Box as="label" htmlFor={id} sx={(theme) => labelStyle({ ...props, isFocused }, theme)}>
        {label}
      </Box>
      <Box
        as="textarea"
        id={id}
        alignItems="center"
        py="2"
        borderColor={error ? 'error' : 'inherit'}
        onChange={onChange}
        onFocus={(event) => {
          onFocus(event);
          setFocus(true);
        }}
        onBlur={(event) => {
          onBlur(event);
          setFocus(false);
        }}
        placeholder={placeholder}
        value={value}
        sx={(theme) => textareaStyle({ ...props, isFocused }, theme)}
      />
    </Box>
  );
};

Textarea.propTypes = {
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

Textarea.defaultProps = {
  error: null,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: '',
};

export { Textarea };
