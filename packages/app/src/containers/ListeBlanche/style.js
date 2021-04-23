const cardStyle = ({ clickable }) => ({
  cursor: clickable ? "pointer" : "default",
  mb: "1",
  overflow: "hidden",
  pl: "16px",
  position: "relative",
  width: "100%",
});

const anchorStyle = {
  margin: "-12px",
  display: "block",
  padding: "12px",
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

export { cardStyle, labelStyle, descriptionStyle, anchorStyle };
