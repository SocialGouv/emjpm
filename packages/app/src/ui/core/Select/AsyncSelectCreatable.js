import AsyncCreatableSelect from "react-select/async-creatable";

import SelectComponent from "./SelectComponent";

export function AsyncSelectCreatable(props) {
  return <SelectComponent component={AsyncCreatableSelect} {...props} />;
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
