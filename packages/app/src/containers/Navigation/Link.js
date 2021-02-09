import { withRouter } from "react-router-dom";
import { Box, Link } from "rebass";

import { Link as RouterLink } from "~/components/Link";

function LinkStyle(isActive) {
  return {
    "&:hover": {
      textDecoration: "none",
    },
    color: isActive ? "primary" : "black",
    cursor: "pointer",
    display: "inline-block",
    fontFamily: "heading",
    fontWeight: "700",
    lineHeight: "1.5",
    p: "2px",
    position: "relative",
  };
}

const LineStyle = {
  bg: "primary",
  borderRadius: "5px",
  height: "10px",
  left: 0,
  mt: "8px",
  position: "absolute",
  right: 0,
};

const BoxStyle = {
  height: "34px",
  overflow: "hidden",
};

function ActiveLink(props) {
  const { location, isNestedLinks, to } = props;
  if (!location) return null;
  const { pathname } = location;
  let isActive;
  if (isNestedLinks) {
    isActive = pathname.startsWith(to);
  } else {
    isActive =
      pathname === to ||
      (pathname === "/direction/mandataires/list" && to === "/direction");
  }

  return (
    <Box sx={BoxStyle}>
      <RouterLink
        to={to}
        component={({ navigate }) => {
          return (
            <Link sx={LinkStyle(isActive)} onClick={() => navigate(to)}>
              {props.children}
              {isActive && <Box sx={LineStyle} />}
            </Link>
          );
        }}
      />
    </Box>
  );
}

export default withRouter(ActiveLink);
