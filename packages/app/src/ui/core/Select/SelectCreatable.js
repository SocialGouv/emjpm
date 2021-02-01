import React, { useRef } from "react";

import Select from "react-select";

import SelectComponent from "./SelectComponent";

import Components from "./CreatableComponents";

// why not using native react-select Creatable ? because:
// no viable solution for createNewOptionOnBlur found at https://github.com/JedWatson/react-select/issues/1764
// editSelectedTag https://github.com/JedWatson/react-select/issues/1558#issuecomment-471657335
// implementation details in parent FormGroupSelect component

const defaultNoOptionsMessage = () => "Aucune option";

function SelectCreatable({
  onChange,
  onInputChange,
  noOptionsMessage = defaultNoOptionsMessage,
  hasError = false,
  size = "large",
  backspaceRemovesValue = false,
  components = {},
  ...props
}) {
  return (
    <SelectComponent
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
      components={{ ...Components, ...components }}
      component={Select}
      noOptionsMessage={noOptionsMessage}
      hasError={hasError}
      size={size}
      backspaceRemovesValue={backspaceRemovesValue}
      {...props}
    />
  );
}

export default SelectCreatable;
