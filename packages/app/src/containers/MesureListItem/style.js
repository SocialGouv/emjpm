const TYPES = {
  "Mesure en attente": "#946800",
  "Mesure en cours": "#0072ca",
  "Mesure clôturée": "#4F7178",
};

const mesureListItemStyle = {
  alignItems: "center",
  cursor: "pointer",
  justifyContent: "flex-start",
  transition: "150ms ease-in-out all",
};

function columnStyle(isMobileHidden, isTabletHidden) {
  return {
    "@media screen and (max-width: 40em)": {
      display: isMobileHidden ? "none" : "flex",
    },
    "@media screen and (max-width: 52em)": {
      display: isTabletHidden ? "none" : "flex",
    },
    flexDirection: "column",
    mr: "1",
  };
}

function availabilityIndicatorStyle(isAvailable) {
  return {
    bg: isAvailable ? "success" : "error",
    borderRadius: "default",
    height: "10px",
    mr: "1",
    width: "10px",
  };
}

const titleStyle = {
  color: "black",
  fontFamily: "heading",
  fontSize: "15px",
  fontWeight: "600",
  mb: "4px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const subtitleStyle = {
  color: "mediumGray",
  fontFamily: "body",
  fontSize: "12px",
  fontWeight: "600",
};

const natureStyle = {
  color: "mediumGray",
  fontFamily: "body",
  fontSize: "12px",
  fontWeight: "600",
  maxWidth: "220px",
};

const labelStyle = {
  color: "mediumGray",
  fontFamily: "body",
  fontSize: "11px",
  fontWeight: "600",
  mb: "7px",
};

const anchorStyle = {
  display: "block",
  margin: "-12xp",
  padding: "12xp",
};

function descriptionStyle(isPositive) {
  return {
    color: isPositive ? "black" : "error",
    fontFamily: "heading",
    fontSize: "13px",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };
}

function decorationStyle(status) {
  return {
    bg: TYPES[status],
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "3px",
  };
}

function statusStyle(status) {
  return {
    color: TYPES[status],
    display: "inline-block",
    fontSize: 0,
  };
}

const cardStyle = {
  "&:hover": {
    bg: "cardSecondary",
  },
  bg: "white",
  mb: "1",
  overflow: "hidden",
  pl: "16px",
  position: "relative",
  pt: "14px",
};

export {
  availabilityIndicatorStyle,
  mesureListItemStyle,
  columnStyle,
  titleStyle,
  subtitleStyle,
  statusStyle,
  labelStyle,
  descriptionStyle,
  decorationStyle,
  cardStyle,
  natureStyle,
  anchorStyle,
};
