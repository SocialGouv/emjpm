import { Upload } from "@styled-icons/boxicons-regular/Upload";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Box, Flex } from "rebass";

import { InputStyle, InputWrapperStyle, LabelStyle } from "./Style";

const InputWrapper = (props) => {
  return (
    <Flex flexDirection="column" sx={InputWrapperStyle(props)} {...props} />
  );
};

const InputElement = (props) => {
  return <Box as="input" sx={InputStyle} {...props} />;
};

const InputLabel = (props) => {
  const { children } = props;
  return (
    <Box as="label" sx={LabelStyle(props)} {...props}>
      {children}
    </Box>
  );
};

const FilePicker = (props) => {
  const {
    onChange,
    placeholder,
    isValid,
    hasError,
    name,
    required,
    size,
    value,
    type,
  } = props;
  const [isFocus, toggleFocus] = useState(false);
  const [hasValue, toogleValue] = useState(false);
  const isActive = isFocus || hasValue || value;

  return (
    <InputWrapper size={size} isValid={isValid} hasError={hasError}>
      <InputLabel
        size={size}
        aria-label={name}
        htmlFor={name}
        isActive={isActive}
      >
        <Flex flexDirection="column" alignItems="center">
          <Upload size="100" />
          {placeholder}
        </Flex>
      </InputLabel>
      <InputElement
        size={size}
        type={type}
        aria-label={name}
        aria-required={required}
        placeholder={null}
        isActive={isActive}
        name={name}
        {...props}
        onChange={(e) => {
          toogleValue(e.target.value.length > 0);
          onChange(e);
        }}
        onBlur={() => toggleFocus(false)}
        onFocus={() => toggleFocus(true)}
      />
    </InputWrapper>
  );
};

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

FilePicker.propTypes = {
  hasError: PropTypes.bool,
  isValid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FilePicker.defaultProps = {
  hasError: false,
  isValid: false,
  onChange: () => {
    return null;
  },
  required: false,
  size: "large",
  type: null,
  value: null,
};

export { FilePicker };
