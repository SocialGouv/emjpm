import React from "react";

import { getStyle } from "./style";
import SelectLabel from "./SelectLabel";

function SelectComponent(
  {
    component: Component,
    label,
    loadingMessage = () => "Chargement des résultats en cours",
    ...props
  },
  ref
) {
  const htmlFor = "react-select-" + props.id + "-input";
  return (
    <>
      {label && (
        <SelectLabel
          size={props.size}
          aria-label={props.name}
          htmlFor={htmlFor}
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
        ref={ref}
        {...props}
      />
    </>
  );
}

export default React.forwardRef(SelectComponent);
