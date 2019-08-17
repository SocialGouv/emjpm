import React from "react";
import { withRouter } from "next/router";
import { Link, Box } from "rebass";
import NextLink from "next/link";

const LinkStyle = isActive => {
  return {
    color: isActive ? "primary" : "black",
    fontFamily: "heading",
    fontWeight: "700",
    cursor: "pointer",
    p: "2px"
  };
};

const LineStyle = {
  width: "100%",
  height: "10px",
  bg: "primary",
  mt: 1,
  borderRadius: "5px"
};

const BoxStyle = {
  overflow: "hidden",
  height: "34px"
};

const ActiveLink = ({ router, ...props }) => {
  const isActive = router.pathname === props.href;
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
