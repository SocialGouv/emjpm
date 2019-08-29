import React from "react";
import { Link as RebassLink } from "rebass";
import NextLink from "next/link";

const LinkButtonStyle = () => {
  return {
    bg: "primary",
    borderRadius: "default",
    px: 3,
    py: 2,
    color: "white",
    cursor: "pointer",
    fontSize: 1,
    fontWeight: 500,
    lineHeight: "1.2",
    outline: "none",
    transition: "150ms ease-in-out opacity",
    "&:hover": {
      opacity: "0.9"
    },
    "&:active": {
      opacity: "0.8"
    }
  };
};

const LinkButton = props => {
  return (
    <NextLink {...props}>
      <RebassLink sx={LinkButtonStyle()} {...props}>
        {props.children}
      </RebassLink>
    </NextLink>
  );
};

export { LinkButton };
