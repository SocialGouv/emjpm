import NextLink from "next/link";
import { withRouter } from "next/router";
import React from "react";
import { Link as RebassLink } from "rebass";

const AntenneLinkButtonStyle = (isActive, disabled) => {
  return {
    "&:active": {
      color: "white",
      opacity: "0.6"
    },
    "&:hover": {
      color: "white",
      opacity: "0.8",
      textDecoration: "none"
    },
    bg: "primary",
    borderRadius: "default",
    color: "white !important",
    cursor: "pointer",
    display: "inline-block",
    fontSize: 1,
    fontWeight: 500,
    lineHeight: "1.2",
    opacity: isActive ? (disabled ? 0.3 : 0.6) : 1,
    outline: "none",
    px: 3,
    py: 2,
    transition: "150ms ease-in-out opacity"
  };
};

const AntenneEditLinkButton = ({ router, ...props }) => {
  const isActive = router.pathname === props.href;
  const antenne_id = props.href;
  return (
    <NextLink
      href="/services/antennes/[antenne_id]/edit"
      as={`/services/antennes/${antenne_id}/edit`}
    >
      <RebassLink sx={AntenneLinkButtonStyle(isActive, props.disabled)}>
        {props.children}
      </RebassLink>
    </NextLink>
  );
};

export default withRouter(AntenneEditLinkButton);
