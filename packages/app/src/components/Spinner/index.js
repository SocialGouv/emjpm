import { keyframes } from "@emotion/react";
import PropTypes from "prop-types";

import { Box } from "rebass";

const animation = keyframes`
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`;

function SpinnerStyle() {
  return {
    height: "22px",
    textAlign: "center",
    width: "70px",
  };
}

function Bounce(delay) {
  return {
    animation: `${animation} 1.4s infinite ease-in-out both`,
    animationDelay: delay,
    borderRadius: "100%",
    display: "inline-block",
    height: "12px",
    m: "5px",
    width: "12px",
  };
}

export default function Spinner(props) {
  const { variant } = props;
  return (
    <Box sx={SpinnerStyle}>
      <Box sx={Bounce("0", variant)} variant={variant} />
      <Box sx={Bounce("-0.16s", variant)} variant={variant} />
      <Box sx={Bounce("-0.32s", variant)} variant={variant} />
    </Box>
  );
}

Spinner.propTypes = {
  variant: PropTypes.string,
};

Spinner.defaultProps = {
  variant: "bgDark",
};
