import { useRef, useState, useMemo, useCallback } from "react";

// import Creatable from "react-select/creatable";
import Select, { components as cs } from "react-select";

import SelectComponent from "./SelectComponent";

function CustomOption(props) {
  let { label } = props;
  if (props.data?.__isNew__) {
    label = `"` + label + `"`;
  }
  return <cs.Option {...props}>{label}</cs.Option>;
}

function NewSingleValue() {
  return null;
}
function NewInput({ value: inputValue, isHidden, ...props }) {
  const {
    selectProps: { value, getOptionLabel },
  } = props;
  const label = useMemo(() => {
    if (!value) {
      return "";
    }
    return getOptionLabel(value);
  }, [getOptionLabel, value]);
  const v = useMemo(() => {
    if (!inputValue) {
      return label;
    }
    return inputValue;
  }, [inputValue, label]);
  const hidden = useMemo(() => {
    if (v) {
      return false;
    }
    return isHidden;
  }, [isHidden, v]);
  return <cs.Input isHidden={hidden} value={v} {...props} />;
}

const components = {
  ...cs,
  Input: NewInput,
  SingleValue: NewSingleValue,
  Option: CustomOption,
};

export function SelectCreatable({
  onFocus,
  onBlur,
  onChange,
  onInputChange,
  ...props
}) {
  const focusedRef = useRef();
  return (
    <SelectComponent
      onFocus={(e) => {
        focusedRef.current = true;
        onFocus && onFocus(e);
      }}
      onBlur={(e) => {
        focusedRef.current = false;
        onBlur && onBlur(e);
      }}
      onChange={(value, { action }) => {
        // console.log("onChange", { value, action });
        return onChange && onChange(value, action);
      }}
      onInputChange={(value) => {
        // console.log("onInputChange", { value, focused: focusedRef.current });
        onInputChange && onInputChange(value);
        if (focusedRef.current) {
          onChange && onChange(value);
        }
      }}
      components={components}
      component={Select}
      {...props}
    />
  );
}

SelectCreatable.defaultProps = {
  hasError: false,
  size: "large",
  noOptionsMessage: () => "Aucune option",
  backspaceRemovesValue: false,
};
