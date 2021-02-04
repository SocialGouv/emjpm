import { Link as RebassLink } from "rebass";

import { Link as RouterLink } from "~/containers/Link";

function LinkStyle() {
  return {
    "&:hover": {
      textDecoration: "underline",
    },
    color: "#007AD9",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  };
}

function isExternalLink(to) {
  return to && (to.startsWith("http") || to.startsWith("mailto"));
}

function Link({ to, ...props }) {
  if (isExternalLink(to)) {
    return (
      <RebassLink sx={LinkStyle()} {...props} href={to}>
        {props.children}
      </RebassLink>
    );
  }
  return (
    <RouterLink
      to={to}
      component={({ navigate }) => (
        <RebassLink sx={LinkStyle()} {...props} onClick={() => navigate(to)}>
          {props.children}
        </RebassLink>
      )}
    />
  );
}

export { Link };
