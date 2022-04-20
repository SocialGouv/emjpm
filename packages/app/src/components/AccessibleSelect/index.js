import React, { useRef } from "react";
import Select from "react-select";

import AsyncSelect from "react-select/async";

import { RequiredAsterisk } from "~/components";
import Creatable from "~/components/Select/Creatable";
import { getStyle } from "./style";
import Label from "./Label";
import MultiValueRemove from "./MultiValueRemove";
import ClearIndicator from "./ClearIndicator";
import { ariaLiveMessages } from "./ariaLiveMessages";

const colourStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    console.log({ data, isDisabled, isFocused, isSelected });
    return {
      ...styles,
      backgroundColor: isFocused || isSelected ? "#0072ca" : null,
      color: isFocused || isSelected ? "#FFFFFF" : "#333333",
    };
  },
};

export default function AccessibleSelect({
  label,
  isCreatable,
  isAsync,
  ...props
}) {
  const selectRef = useRef(null);
  const ClearIndicatorStyles = (base, state) => ({
    ...base,
    cursor: "pointer",
    color: state.isFocused ? "blue" : "black",
  });

  const multiValueRemoveStyle = (base, state) => ({
    ...base,
    cursor: "pointer",
  });

  if (!label && props.placeholder) {
    label = props.placeholder;
  }
  const Component = isCreatable ? Creatable : isAsync ? AsyncSelect : Select;
  const forId = props?.id || props?.instanceId;

  return (
    <>
      {label && (
        <Label
          size={props.size}
          htmlFor={`react-select-${forId}-input`}
          isActive={props.isActive}
          required={props.required}
          aria-required={props.required}
          readOnly={props.readOnly}
          onClick={() => selectRef?.current?.focus()}
        >
          {label}
          {props.required && !props.readOnly && <RequiredAsterisk />}
        </Label>
      )}
      <Component
        ref={selectRef}
        options={props?.options || []}
        components={{ MultiValueRemove, ClearIndicator }}
        styles={{
          clearIndicator: ClearIndicatorStyles,
          multiValueRemove: multiValueRemoveStyle,
          ...getStyle(props),
          ...colourStyles,
        }}
        menuPortalTarget={document.body}
        {...props}
        instanceId={forId}
        ariaLiveMessages={ariaLiveMessages}
      />
    </>
  );
}
