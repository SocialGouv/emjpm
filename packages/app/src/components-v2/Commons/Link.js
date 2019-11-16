import NextLink from "next/link";
import React from "react";
import { Link as RebassLink } from "rebass";

const LinkStyle = () => {
  return {
    "&:hover": {
      textDecoration: "underline"
    },
    color: "#007AD9",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600
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
