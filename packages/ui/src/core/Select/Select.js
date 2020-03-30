import PropTypes from 'prop-types';
import React from 'react';
import ReactSelect from 'react-select';

import { getStyle } from "./style";

export const Select = (props) => {
  return <ReactSelect styles={getStyle(props)} {...props} />;
};

Select.propTypes = {
  size: PropTypes.string,
};

Select.defaultProps = {
  size: 'large',
};