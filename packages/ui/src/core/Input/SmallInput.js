import PropTypes from 'prop-types';
import React from 'react';

import { Input } from './Input';

function getBorderProps({ hasError, hasWarning }) {
  if (hasWarning) {
    return { border: '3px solid #1D2649' };
  }
  if (hasError) {
    return { border: '3px solid #FF6862' };
  }
  return {};
}

export const SmallInput = (props) => {
  return (
    <Input
      {...props}
      sx={{
        ...getBorderProps(props),
        borderRadius: '8px',
        color: '#000000',
        fontSize: '14px',
        padding: '15px 5px',
        textAlign: 'center',
        width: '60px',
      }}
    />
  );
};

SmallInput.defaultProps = {
  hasError: false,
};

SmallInput.propTypes = {
  hasError: PropTypes.bool,
};

export default SmallInput;
