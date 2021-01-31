import ReactAsyncSelect from "react-select/async";

import SelectComponent from "./SelectComponent";

export default function AsyncSelect({
  size = "large",
  noOptionsMessage = ({ inputValue }) => {
    if (inputValue.length < 1) {
      return "Entrez du texte pour rechercher";
    }
    return "Aucune entrée trouvée";
  },
  ...props
}) {
  return <SelectComponent component={ReactAsyncSelect} {...props} />;
}
