import { Link as RebassLink } from "rebass";

import { Link as RouterLink } from "~/components/Link";

function LinkStyle() {
  return {
    "&:hover": {
      textDecoration: "underline",
    },
    color: "#0072ca",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  };
}

function isExternalLink(to) {
  return to && (to.startsWith("http") || to.startsWith("mailto"));
}

function Link({ to, ...props }) {
  if (isExternalLink(to) || props.target == "_blank") {
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
        <RebassLink
          sx={LinkStyle()}
          {...props}
          onClick={(e) => {
            if (e.ctrlKey) {
              return;
            }
            e.preventDefault();
            navigate(to);
          }}
          href={to}
        >
          {props.children}
        </RebassLink>
      )}
    />
  );
}

export { Link };
