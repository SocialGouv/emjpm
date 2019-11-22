import NextLink from "next/link";
import { withRouter } from "next/router";
import React from "react";
import { Link as RebassLink } from "rebass";

const ServiceLinkButtonStyle = (isActive, disabled) => {
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

const ServiceEditLinkButton = ({ router, ...props }) => {
  const isActive = router.pathname === props.href;
  return (
    <NextLink href="/services/edit" as={`/services/edit`}>
      <RebassLink sx={ServiceLinkButtonStyle(isActive, props.disabled)}>
        {props.children}
      </RebassLink>
    </NextLink>
  );
};

export default withRouter(ServiceEditLinkButton);
