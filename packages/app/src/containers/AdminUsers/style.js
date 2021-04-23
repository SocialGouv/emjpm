function cardStyle(active) {
  return {
    borderLeft: active ? "2px solid green" : "2px solid red",
    overflow: "hidden",
    position: "relative",
    borderRadius: "0",
    marginBottom: "1px",
  };
}

const anchorStyle = {
  cursor: "pointer",
  margin: "-12px",
  paddingLeft: "16px",
  paddingTop: "12px",
  width: "calc(100% - 45px)",
};

const labelStyle = {
  color: "mediumGray",
  fontFamily: "body",
  fontSize: "11px",
  fontWeight: "600",
  mb: "5px",
  mt: "0",
};

const descriptionStyle = {
  fontFamily: "heading",
  fontSize: "13px",
  fontWeight: "600",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export { cardStyle, labelStyle, descriptionStyle, anchorStyle };
