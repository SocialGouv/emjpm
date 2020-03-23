import React from 'react';
import ReactSelect from 'react-select';

import { getStyle } from "./style";

export const Select = (props) => {
  return <ReactSelect styles={getStyle(props)} {...props} />;
};
