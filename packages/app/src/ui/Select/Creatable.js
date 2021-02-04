import React, { useRef } from "react";

import ReactSelect from "react-select";

import components from "./components";

// why not using native react-select Creatable ? because:
// no viable solution for createNewOptionOnBlur found at https://github.com/JedWatson/react-select/issues/1764
// editSelectedTag https://github.com/JedWatson/react-select/issues/1558#issuecomment-471657335
// implementation details in parent FormGroupSelect component

export default function Creatable({
  onChange,
  onInputChange,
  backspaceRemovesValue = false,
  components: componentsProps = {},
  ...props
}) {
  return (
    <ReactSelect
      onChange={(value, event) => {
        onChange && onChange(value, event);
      }}
      onInputChange={(value, event) => {
        onInputChange && onInputChange(value, event);
        const { action } = event;
        if (action === "input-change") {
          onChange && onChange(value);
        }
      }}
      components={{ ...components, ...componentsProps }}
      backspaceRemovesValue={backspaceRemovesValue}
      {...props}
    />
  );
}
