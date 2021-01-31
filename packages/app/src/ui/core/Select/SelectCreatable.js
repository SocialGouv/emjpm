import React, { useRef } from "react";

import Select from "react-select";

import SelectComponent from "./SelectComponent";

import Components from "./Components";

// why not using native react-select Creatable ? because:
// no viable solution for createNewOptionOnBlur found at https://github.com/JedWatson/react-select/issues/1764
// editSelectedTag https://github.com/JedWatson/react-select/issues/1558#issuecomment-471657335

function SelectCreatable(
  {
    onChange,
    onInputChange,
    noOptionsMessage = () => "Aucune option",
    hasError = false,
    size = "large",
    backspaceRemovesValue = false,
    components = {},
    ...props
  },
  ref
) {
  return (
    <SelectComponent
      onChange={(value, event) => {
        return onChange && onChange(value, event);
      }}
      onInputChange={(value, event) => {
        onInputChange && onInputChange(value, event);
        const { action } = event;
        if (action === "input-change") {
          onChange && onChange(value);
        }
      }}
      components={{ ...Components, ...components }}
      component={Select}
      noOptionsMessage={() => "Aucune option"}
      hasError={hasError}
      size={size}
      backspaceRemovesValue={backspaceRemovesValue}
      ref={ref}
      {...props}
    />
  );
}

export default React.forwardRef(SelectCreatable);
