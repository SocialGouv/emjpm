import React from "react";
import { Link as RebassLink } from "rebass";
import { withRouter } from "next/router";
import NextLink from "next/link";

const LinkButtonStyle = isActive => {
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
    opacity: isActive ? 0.6 : 1,
    "&:hover": {
      color: "white",
      opacity: "0.8",
      textDecoration: "none"
    },
    "&:active": {
      color: "white",
      opacity: "0.6"
    }
  };
};

const LinkButton = ({ router, ...props }) => {
  const isActive = router.pathname === props.href;
  return (
    <NextLink {...props}>
      <RebassLink sx={LinkButtonStyle(isActive)} {...props}>
        {props.children}
      </RebassLink>
    </NextLink>
  );
};

export default withRouter(LinkButton);
