import React from "react";
import Select from "react-select";

import { RequiredAsterisk } from "~/components";
import { getStyle } from "./style";
import Label from "./Label";
import MultiValueRemove from "./MultiValueRemove";
import ClearIndicator from "./ClearIndicator";

export default function AccessibleSelect({ label, ...props }) {
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
  return (
    <>
      {label && (
        <Label
          size={props.size}
          aria-describedby={props.id}
          htmlFor={props.id}
          isActive={props.isActive}
          required={props.required}
          aria-required={props.required}
          readOnly={props.readOnly}
        >
          {label}
          {props.required && !props.readOnly && <RequiredAsterisk />}
        </Label>
      )}
      <Select
        options={props?.options || []}
        components={{ MultiValueRemove, ClearIndicator }}
        styles={{
          clearIndicator: ClearIndicatorStyles,
          multiValueRemove: multiValueRemoveStyle,
          ...getStyle(props),
        }}
        menuPortalTarget={document.body}
        {...props}
      />
    </>
  );
}
