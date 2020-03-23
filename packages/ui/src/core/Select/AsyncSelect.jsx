import React from 'react';
import ReactAsyncSelect from 'react-select/async';

import { getStyle } from "./style";

export const AsyncSelect = (props) => {
  return <ReactAsyncSelect styles={getStyle(props)} {...props} />;
};
