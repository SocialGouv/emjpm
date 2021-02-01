import React from "react";

import { getStyle } from "./style";
import SelectLabel from "./SelectLabel";

const defaultLoadingMessage = () => "Chargement des résultats en cours";

function SelectComponent({
  component: Component,
  label,
  loadingMessage = defaultLoadingMessage,
  ...props
}) {
  return (
    <>
      {label && (
        <SelectLabel
          size={props.size}
          aria-label={props.name}
          htmlFor={"react-select-" + props.id + "-input"}
          isActive={props.isActive}
          required={props.required}
          readOnly={props.readOnly}
        >
          {label}
        </SelectLabel>
      )}
      <Component
        menuPortalTarget={document.body}
        loadingMessage={loadingMessage}
        styles={getStyle(props)}
        {...props}
      />
    </>
  );
}

export default SelectComponent;
