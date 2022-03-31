import React from "react";
import PropTypes from "prop-types";

import { Box, Button as RebassButton } from "rebass";

import Spinner from "../Spinner";
import { buttonStyle } from "./style";

function spinnerStyle() {
  return {
    left: "50%",
    ml: "-35px",
    position: "absolute",
    right: "0",
  };
}

function content(props) {
  const { isLoading } = props;
  return {
    opacity: isLoading ? "0" : "1",
  };
}

const btnStyle = ({ disabled }) => ({
  ...buttonStyle,
  cursor: !disabled ? "pointer" : "not-allowed",
  opacity: disabled ? 0.5 : 1,
});

function Button(props, ref) {
  const { isLoading, children } = props;

  return (
    <RebassButton sx={btnStyle(props)} {...props}>
      {isLoading && (
        <Box sx={spinnerStyle}>
          <Spinner variant="bgLight" />
        </Box>
      )}
      <Box isLoading={isLoading} sx={content(props)} ref={ref}>
        {children}
      </Box>
    </RebassButton>
  );
}

export default React.forwardRef(Button);

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
  type: "button",
};
