import NextLink from "next/link";
import { withRouter } from "next/router";
import React from "react";
import { Box, Link } from "rebass";

const LinkStyle = isActive => {
  return {
    "&:hover": {
      textDecoration: "none"
    },
    color: isActive ? "primary" : "black",
    cursor: "pointer",
    display: "inline-block",
    fontFamily: "heading",
    fontWeight: "700",
    lineHeight: "1.5",
    p: "2px",
    position: "relative"
  };
};

const LineStyle = {
  bg: "primary",
  borderRadius: "5px",
  height: "10px",
  left: 0,
  mt: "8px",
  position: "absolute",
  right: 0
};

const BoxStyle = {
  height: "34px",
  overflow: "hidden"
};

const ActiveLink = ({ router, isNestedLinks, ...props }) => {
  let isActive;
  if (isNestedLinks) {
    isActive = router.pathname.startsWith(props.href);
  } else {
    isActive =
      router.pathname === props.href ||
      (router.pathname === "/direction/mandataires/list" && props.href === "/direction");
  }

  return (
    <Box sx={BoxStyle}>
      <NextLink {...props}>
        <Link {...props} sx={LinkStyle(isActive)}>
          {props.children}
          {isActive && <Box sx={LineStyle} />}
        </Link>
      </NextLink>
    </Box>
  );
};

export default withRouter(ActiveLink);
