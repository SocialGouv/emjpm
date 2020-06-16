const MagistratMandatairesMapStyle = () => {
  return {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: "0",
    pt: "115px",
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
  width: "200px",
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
  mb: "0",
  mt: "10px",
  lineHeight: "1.4",
};

const descriptionStyle = {
  color: "black",
  fontFamily: "heading",
  fontSize: "13px",
  fontWeight: "600",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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

export {
  MagistratMandatairesMapStyle,
  titleStyle,
  subtitleStyle,
  labelStyle,
  descriptionStyle,
  dispoDescriptionStyle,
};
