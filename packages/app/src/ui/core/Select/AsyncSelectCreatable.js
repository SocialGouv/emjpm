import { useRef } from "react";

import AsyncCreatableSelect from "react-select/async-creatable";

import useCreateNewOptionOnBlur from "./useCreateNewOptionOnBlur";

import SelectComponent from "./SelectComponent";

export function AsyncSelectCreatable(props) {
  const componentRef = useRef();
  props = useCreateNewOptionOnBlur(props, componentRef);

  return (
    <SelectComponent
      component={AsyncCreatableSelect}
      componentRef={componentRef}
      {...props}
    />
  );
}

AsyncSelectCreatable.defaultProps = {
  size: "large",
  noOptionsMessage: ({ inputValue }) => {
    if (inputValue.length < 1) {
      return "Entrez du texte pour rechercher ou créer une nouvelle entrée";
    }
    return "Aucune entrée trouvée";
  },
};
