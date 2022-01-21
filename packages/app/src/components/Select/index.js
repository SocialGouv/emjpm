import PropTypes from "prop-types";

import ReactSelect from "react-select";
import ReactAsyncSelect from "react-select/async";

import React from "react";

import { RequiredAsterisk } from "~/components";

import { getStyle } from "./style";
import Label from "./Label";
import Creatable from "./Creatable";

export default function Select({ isAsync, isCreatable, label, ...props }) {
  const Component = isCreatable
    ? Creatable
    : isAsync
    ? ReactAsyncSelect
    : ReactSelect;
  if (!label && props.placeholder) {
    label = props.placeholder;
  }
  return (
    <>
      {label && (
        <Label
          size={props.size}
          htmlFor={"react-select-" + props.id + "-input"}
          isActive={props.isActive}
          required={props.required}
          aria-required={props.required}
          readOnly={props.readOnly}
        >
          {label}
          {props.required && !props.readOnly && <RequiredAsterisk />}
        </Label>
      )}
      <Component
        menuPortalTarget={document.body}
        styles={getStyle(props)}
        {...props}
      />
    </>
  );
}
Select.propTypes = {
  hasError: PropTypes.bool,
  size: PropTypes.string,
};

Select.defaultProps = {
  hasError: false,
  size: "large",
  noOptionsMessage: () => "Aucune option",
  loadingMessage: () => "Chargement des résultats en cours",
};
