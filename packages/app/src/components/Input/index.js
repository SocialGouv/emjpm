import PropTypes from "prop-types";
import { useState } from "react";
import { Box } from "rebass";

import { InputStyle, InputWrapperStyle, LabelStyle } from "./style";

function InputWrapper(props) {
  return <Box as="div" sx={InputWrapperStyle(props)} {...props} />;
}

function InputElement(props) {
  return <Box as="input" sx={InputStyle(props)} {...props} />;
}

function InputLabel(props) {
  const { children } = props;
  return (
    <Box as="label" sx={LabelStyle(props)} {...props}>
      {children}
    </Box>
  );
}

function formatFormInput(value) {
  return value === null || value === undefined ? "" : value;
}

function Input(props) {
  const {
    onChange,
    placeholder,
    label,
    isValid,
    hasError,
    name,
    required,
    size,
    value,
    type,
    onBlur,
    onFocus,
    readOnly,
    forceActive,
  } = props;
  const [isFocus, toggleFocus] = useState(false);
  const [hasValue, toogleValue] = useState(false);
  const isActive =
    forceActive ||
    isFocus ||
    hasValue ||
    (value !== null && value !== undefined && value !== "");

  return (
    <InputWrapper size={size} isValid={isValid} hasError={hasError}>
      {(placeholder || label) && (
        <InputLabel
          size={size}
          aria-label={name}
          htmlFor={name}
          isActive={isActive}
          required={required}
          readOnly={readOnly}
        >
          {label || placeholder}
        </InputLabel>
      )}
      <InputElement
        size={size}
        type={type}
        aria-label={name}
        aria-required={required}
        placeholder={null}
        isActive={isActive}
        {...props}
        value={formatFormInput(value)}
        name={name}
        onChange={(e) => {
          toogleValue(e.target.value.length > 0);
          onChange(e);
        }}
        onBlur={(event) => {
          toggleFocus(false);
          if (onBlur) {
            onBlur(event);
          }
        }}
        onFocus={() => {
          toggleFocus(true);
          if (onFocus) {
            onFocus(event);
          }
        }}
      />
    </InputWrapper>
  );
}

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

Input.propTypes = {
  hasError: PropTypes.bool,
  isValid: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  hasError: false,
  isValid: false,
  onBlur: undefined,
  onChange: () => {
    return null;
  },
  readOnly: false,
  required: false,
  size: "large",
  title: null,
  type: null,
  value: null,
};

export default Input;
