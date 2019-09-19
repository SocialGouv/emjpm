import NextLink from "next/link";
import { withRouter } from "next/router";
import React from "react";
import { Box, Link } from "rebass";

const LinkStyle = isActive => {
  return {
    color: isActive ? "primary" : "black",
    fontFamily: "heading",
    fontWeight: "700",
    cursor: "pointer",
    p: "2px",
    position: "relative",
    display: "inline-block",
    lineHeight: "1.5",
    "&:hover": {
      textDecoration: "none"
    }
  };
};

const LineStyle = {
  left: 0,
  right: 0,
  height: "10px",
  bg: "primary",
  mt: "8px",
  borderRadius: "5px",
  position: "absolute"
};

const BoxStyle = {
  overflow: "hidden",
  height: "34px"
};

const ActiveLink = ({ router, activeNestedLinks, ...props }) => {
  let isActive;
  if (activeNestedLinks) {
    isActive = router.pathname.startsWith(props.href);
  } else {
    isActive = router.pathname === props.href;
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
