import { Input } from "@rebass/forms";
import PropTypes from "prop-types";
import React from "react";

function getBorderProps({ hasError, hasWarning }) {
  if (hasWarning) {
    return { border: "1px solid #1D2649" };
  }
  if (hasError) {
    return { border: "1px solid #FF6862" };
  }
  return {};
}

export const SmallInput = props => {
  return (
    <Input
      {...props}
      sx={{
        ...getBorderProps(props),
        borderRadius: "8px",
        color: "#000000",
        fontSize: "14px",
        padding: "15px 5px",
        textAlign: "center",
        width: props.width ? `${props.width}px` : "60px"
      }}
    />
  );
};

SmallInput.defaultProps = {
  hasError: false
};

SmallInput.propTypes = {
  hasError: PropTypes.bool
};

export default SmallInput;
