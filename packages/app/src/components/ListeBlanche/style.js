const cardStyle = (userId) => {
  return {
    mb: "1",
    overflow: "hidden",
    pl: "16px",
    position: "relative",
    width: "100%",
    borderLeft: userId ? "2px solid green" : "2px solid red",
  };
};

const labelStyle = {
  color: "mediumGray",
  fontFamily: "body",
  fontSize: "11px",
  fontWeight: "600",
  mb: "5px",
  mt: "7px",
};

const descriptionStyle = {
  fontFamily: "heading",
  fontSize: "13px",
  fontWeight: "600",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export { cardStyle, labelStyle, descriptionStyle };
