import NextLink from "next/link";
import React from "react";
import { Link as RebassLink } from "rebass";

const LinkStyle = () => {
  return {
    color: "#007AD9",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "13px",
    "&:hover": {
      textDecoration: "underline"
    }
  };
};

const isExternalLink = href => href && (href.startsWith("http") || href.startsWith("mailto"));

const Link = props => {
  if (isExternalLink(props.href)) {
    return (
      <RebassLink sx={LinkStyle()} {...props}>
        {props.children}
      </RebassLink>
    );
  }
  return (
    <NextLink href={props.href}>
      <RebassLink sx={LinkStyle()} {...props}>
        {props.children}
      </RebassLink>
    </NextLink>
  );
};

export { Link };
