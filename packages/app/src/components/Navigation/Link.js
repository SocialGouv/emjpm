import NextLink from "next/link";
import { withRouter } from "next/router";
import React from "react";
import { Box, Link } from "rebass";

const LinkStyle = (isActive) => {
  return {
    "&:hover": {
      textDecoration: "none",
    },
    color: isActive ? "primary" : "black",
    cursor: "pointer",
    display: "inline-block",
    fontFamily: "heading",
    fontWeight: "700",
    lineHeight: "1.5",
    p: "2px",
    position: "relative",
  };
};

const LineStyle = {
  bg: "primary",
  borderRadius: "5px",
  height: "10px",
  left: 0,
  mt: "8px",
  position: "absolute",
  right: 0,
};

const BoxStyle = {
  height: "34px",
  overflow: "hidden",
};

const ActiveLink = (props) => {
  const { router, isNestedLinks, href, as } = props;
  if (!router) return null;
  const { pathname } = router;
  let isActive;
  if (isNestedLinks) {
    isActive = pathname.startsWith(href);
  } else {
    isActive =
      pathname === href || (pathname === "/direction/mandataires/list" && href === "/direction");
  }

  return (
    <Box sx={BoxStyle}>
      <NextLink href={href} as={as}>
        <Link href={href} sx={LinkStyle(isActive)}>
          {props.children}
          {isActive && <Box sx={LineStyle} />}
        </Link>
      </NextLink>
    </Box>
  );
};

export default withRouter(ActiveLink);
