import Creatable from "react-select/creatable";
import SelectComponent from "./SelectComponent";

export function SelectCreatableLegacy(props) {
  return <SelectComponent component={Creatable} {...props} />;
}

SelectCreatableLegacy.defaultProps = {
  hasError: false,
  size: "large",
  noOptionsMessage: () => "Aucune option",
  allowCreateWhileLoading: true,
};
