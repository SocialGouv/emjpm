import { Link as RebassLink } from "rebass";

import { Link as RouterLink } from "~/components/Link";

const LinkStyle = () => {
  return {
    "&:hover": {
      textDecoration: "underline",
    },
    color: "#007AD9",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  };
};

const isExternalLink = (to) => {
  return to && (to.startsWith("http") || to.startsWith("mailto"));
};

const Link = ({ to, ...props }) => {
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
};

export { Link };
