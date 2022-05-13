import { withRouter } from "react-router-dom";
import { Link as RebassLink } from "rebass";

import { Link as RouterLink } from "~/components/Link";

function AntenneLinkButtonStyle(isActive, disabled) {
  return {
    "&:active": {
      color: "white",
    },
    "&:hover": {
      color: "white",
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
    // opacity: isActive ? (disabled ? 0.3 : 0.6) : 1,
    outline: "none",
    px: 3,
    py: 2,
    transition: "150ms ease-in-out opacity",
  };
}

function AntenneEditLinkButton({ antenne_id, location, ...props }) {
  const isActive = location.pathname === `/services/antennes/${antenne_id}`;
  return (
    <RouterLink to={`/services/antennes/${antenne_id}/edit`}>
      <RebassLink sx={AntenneLinkButtonStyle(isActive, props.disabled)}>
        {props.children}
      </RebassLink>
    </RouterLink>
  );
}

export default withRouter(AntenneEditLinkButton);
