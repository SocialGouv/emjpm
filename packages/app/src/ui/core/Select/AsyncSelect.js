import PropTypes from "prop-types";

import ReactAsyncSelect from "react-select/async";

import { getStyle } from "./style";

export function AsyncSelect(props) {
  return <ReactAsyncSelect styles={getStyle(props)} {...props} />;
}

AsyncSelect.propTypes = {
  size: PropTypes.string,
};

AsyncSelect.defaultProps = {
  size: "large",
};
