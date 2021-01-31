import PropTypes from "prop-types";

import ReactAsyncSelect from "react-select/async";

import SelectComponent from "./SelectComponent";

export function AsyncSelect(props) {
  return <SelectComponent component={ReactAsyncSelect} {...props} />;
}

AsyncSelect.propTypes = {
  size: PropTypes.string,
};

AsyncSelect.defaultProps = {
  size: "large",
  noOptionsMessage: ({ inputValue }) => {
    if (inputValue.length < 1) {
      return "Entrez du texte pour rechercher";
    }
    return "Aucune entrée trouvée";
  },
};
