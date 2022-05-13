import React from "react";
import { components } from "react-select";

import { ReactComponent as MultiValueClearSvg } from "./clearIndicator.svg";

export default function MultiValueRemove(props) {
  return (
    <components.MultiValueRemove
      {...props}
      innerProps={{
        ...props.innerProps,
        "aria-label": `Supprimer ${props.data.label}`,
        "aria-pressed": false,
      }}
      style={{ cursor: "pointer" }}
      className="multi-value-clearsvg"
    >
      <MultiValueClearSvg
        aria-label={`Supprimer ${props.data.label}`}
        role="img"
        width="14"
      />
    </components.MultiValueRemove>
  );
}
