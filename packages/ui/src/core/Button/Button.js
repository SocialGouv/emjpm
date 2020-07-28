import PropTypes from 'prop-types';
import React from 'react';
import { Box, Button as RebassButton } from 'rebass';

import { Spinner } from '../Spinner';
import { buttonStyle } from './style';

const spinnerStyle = () => {
  return {
    left: '50%',
    ml: '-35px',
    position: 'absolute',
    right: '0',
  };
};

const content = (props) => {
  const { isLoading } = props;
  return {
    opacity: isLoading ? '0' : '1',
  };
};

const btnStyle = ({ disabled }) => ({
  ...buttonStyle,
  cursor: !disabled ? 'pointer' : 'initial',
  opacity: disabled ? 0.5 : 1,
});

const Button = (props) => {
  const { isLoading, children } = props;

  return (
    <RebassButton sx={btnStyle(props)} {...props}>
      {isLoading && (
        <Box sx={spinnerStyle}>
          <Spinner variant="bgLight" />
        </Box>
      )}
      <Box isLoading={isLoading} sx={content(props)}>
        {children}
      </Box>
    </RebassButton>
  );
};

export { Button };

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  isLoading: false,
  variant: null,
};
