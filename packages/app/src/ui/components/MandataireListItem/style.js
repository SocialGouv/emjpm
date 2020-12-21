const TYPES = {
  individuel: "#D6317D",
  préposé: "#D29E10",
  service: "#3174D6",
};

const MandatairelistStyle = {
  justifyContent: "space-between",
};

const columnStyle = (isMobileHidden, isTabletHidden) => {
  return {
    "@media screen and (max-width: 40em)": {
      display: isMobileHidden ? "none" : "flex",
    },
    "@media screen and (max-width: 52em)": {
      display: isTabletHidden ? "none" : "flex",
    },
    flexDirection: "column",
  };
};

const availabilityIndicatorStyle = (isAvailable) => {
  return {
    bg: isAvailable ? "success" : "error",
    borderRadius: "default",
    height: "10px",
    mr: "1",
    width: "10px",
  };
};

const titleStyle = {
  color: "black",
  fontFamily: "heading",
  fontSize: "15px",
  fontWeight: "600",
  my: "4px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "130px",
};

const subtitleStyle = {
  color: "mediumGray",
  fontFamily: "body",
  fontSize: "12px",
  fontWeight: "600",
};

const labelStyle = {
  color: "mediumGray",
  fontFamily: "body",
  fontSize: "11px",
  fontWeight: "600",
  mb: "5px",
  mt: "7px",
};

const dispoDescriptionStyle = (isPositive) => {
  return {
    color: isPositive ? "success" : "error",
    fontFamily: "heading",
    fontSize: "13px",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };
};

const descriptionStyle = (isPositive) => {
  return {
    color: isPositive ? "black" : "error",
    fontFamily: "heading",
    fontSize: "13px",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };
};

const decorationStyle = (type) => {
  return {
    bg: TYPES[type],
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    width: "3px",
  };
};

const cardStyle = {
  "&:hover": {
    bg: "cardSecondary",
  },
  cursor: "pointer",
  mb: "1",
  overflow: "hidden",
  pl: "16px",
  position: "relative",
};

export {
  dispoDescriptionStyle,
  availabilityIndicatorStyle,
  MandatairelistStyle,
  columnStyle,
  titleStyle,
  subtitleStyle,
  labelStyle,
  descriptionStyle,
  decorationStyle,
  cardStyle,
};
