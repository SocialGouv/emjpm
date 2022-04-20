import PropTypes from "prop-types";
import { useState } from "react";
import { Box } from "rebass";
import { RequiredAsterisk } from "~/components";

import { InputStyle, InputWrapperStyle, LabelStyle } from "./style";

function InputWrapper(props) {
  return <Box as="div" sx={InputWrapperStyle(props)} {...props} />;
}

function InputElement(props) {
  return <Box as="input" sx={InputStyle(props)} {...props} />;
}

function InputLabel({ children, noRequiredAsterisk, ...props }) {
  const { required, readOnly } = props;
  const displayAsterisk = required && !readOnly && !noRequiredAsterisk;
  return (
    <Box as="label" sx={LabelStyle(props)} {...props}>
      {children}
      {displayAsterisk && <RequiredAsterisk />}
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
    noRequiredAsterisk,
    containerStyle,
    ariaLabel,
  } = props;

  const [isFocus, toggleFocus] = useState(false);
  const [hasValue, toogleValue] = useState(false);
  const isActive =
    forceActive ||
    isFocus ||
    hasValue ||
    (value !== null && value !== undefined && value !== "");
  return (
    <InputWrapper
      isActive={isActive}
      isFocus={isFocus}
      readOnly={readOnly}
      size={size}
      isValid={isValid}
      hasError={hasError}
      style={containerStyle}
    >
      {(placeholder || label) && (
        <InputLabel
          size={size}
          htmlFor={name}
          isActive={isActive}
          required={required}
          noRequiredAsterisk={noRequiredAsterisk}
          readOnly={readOnly}
        >
          {label || placeholder}
        </InputLabel>
      )}
      <InputElement
        size={size}
        type={type}
        aria-label={ariaLabel || name}
        aria-required={required}
        aria-describedby={
          props?.ariaDescribedBy !== "none" ? `error-${props.id}` : null
        }
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
        aria-invalid={hasError}
        id={props.id || name}
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
  noRequiredAsterisk: PropTypes.bool,
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
  noRequiredAsterisk: false,
};

export default Input;
