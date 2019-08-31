import React from "react";
import { Link as RebassLink } from "rebass";
import NextLink from "next/link";

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

const Link = props => {
  return (
    <NextLink {...props}>
      <RebassLink sx={LinkStyle()} {...props}>
        {props.children}
      </RebassLink>
    </NextLink>
  );
};

export { Link };
