const cardStyle = ({ clickable }) => ({
  cursor: clickable ? "pointer" : "default",
  overflow: "hidden",
  pl: "16px",
  position: "relative",
  width: "100%",
  borderLeft: "2px solid #0072ca",
  borderRadius: "0",
  marginBottom: "1px !important",
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

const readOnlyContainerStyle = {
  marginBottom: "10px",
};

const readOnlyInputStyle = {
  cursor: "not-allowed",
};

export {
  cardStyle,
  labelStyle,
  descriptionStyle,
  anchorStyle,
  readOnlyContainerStyle,
  readOnlyInputStyle,
};
