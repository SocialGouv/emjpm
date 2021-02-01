import PropTypes from "prop-types";

import ReactSelect from "react-select";

import SelectComponent from "./SelectComponent";

export default function Select(props) {
  return <SelectComponent component={ReactSelect} {...props} />;
}
Select.propTypes = {
  hasError: PropTypes.bool,
  size: PropTypes.string,
};

Select.defaultProps = {
  hasError: false,
  size: "large",
  noOptionsMessage: () => "Aucune option",
};
