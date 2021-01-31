import AsyncCreatableSelect from "react-select/async-creatable";

import SelectComponent from "./SelectComponent";

export function AsyncSelectCreatableLegacy(props) {
  return <SelectComponent component={AsyncCreatableSelect} {...props} />;
}

AsyncSelectCreatableLegacy.defaultProps = {
  size: "large",
  noOptionsMessage: ({ inputValue }) => {
    if (inputValue.length < 1) {
      return "Entrez du texte pour rechercher ou créer une nouvelle entrée";
    }
    return "Aucune entrée trouvée";
  },
};
