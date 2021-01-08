import PropTypes from "prop-types";

import ReactSelect from "react-select";

import { getStyle } from "./style";

export const Select = (props) => {
  return <ReactSelect styles={getStyle(props)} {...props} />;
};

Select.propTypes = {
  hasError: PropTypes.bool,
  size: PropTypes.string,
};

Select.defaultProps = {
  hasError: false,
  size: "large",
};
