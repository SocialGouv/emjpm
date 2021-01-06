import React from "react";
import { withRouter } from "react-router-dom";
import { Link as RebassLink } from "rebass";

import { Link as RouterLink } from "~/components/Link";

const AntenneLinkButtonStyle = (isActive, disabled) => {
  return {
    "&:active": {
      color: "white",
      opacity: "0.6",
    },
    "&:hover": {
      color: "white",
      opacity: "0.8",
      textDecoration: "none",
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
    transition: "150ms ease-in-out opacity",
  };
};

const AntenneLinkButton = ({ location, ...props }) => {
  const isActive = location.pathname === props.href;
  const antenne_id = props.href;
  const to = `/services/antennes/${antenne_id}`;
  return (
    <RouterLink
      to={to}
      component={({ navigate }) => (
        <RebassLink
          sx={AntenneLinkButtonStyle(isActive, props.disabled)}
          onClick={() => navigate(to)}
        >
          {props.children}
        </RebassLink>
      )}
    />
  );
};

export default withRouter(AntenneLinkButton);
