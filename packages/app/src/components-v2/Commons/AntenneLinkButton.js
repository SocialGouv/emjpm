import React from "react";
import { Link as RebassLink } from "rebass";
import { withRouter } from "next/router";
import NextLink from "next/link";

const AntenneLinkButtonStyle = (isActive, disabled) => {
  return {
    bg: "primary",
    borderRadius: "default",
    px: 3,
    py: 2,
    color: "white !important",
    cursor: "pointer",
    fontSize: 1,
    fontWeight: 500,
    lineHeight: "1.2",
    outline: "none",
    display: "inline-block",
    transition: "150ms ease-in-out opacity",
    opacity: isActive ? (disabled ? 0.3 : 0.6) : 1,
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

const AntenneLinkButton = ({ router, ...props }) => {
  const isActive = router.pathname === props.href;
  const antenne_id = props.href;
  return (
    <NextLink href="/services/antennes/[antenne_id]" as={`/services/antennes/${antenne_id}`}>
      <RebassLink sx={AntenneLinkButtonStyle(isActive, props.disabled)}>
        {props.children}
      </RebassLink>
    </NextLink>
  );
};

export default withRouter(AntenneLinkButton);
