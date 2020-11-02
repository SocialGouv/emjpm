const MagistratMandatairesMapStyle = () => {
  return {
    height: "100%",
    position: "absolute",
    pt: "115px",
    top: "0",
    width: "100%",
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
  lineHeight: "1.4",
  mb: "0",
  mt: "10px",
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
