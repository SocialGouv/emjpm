const GreffierMandatairesListStyle = {
  width: "100%",
};

const titleStyle = {
  color: "mediumGray",
  fontSize: "2",
  fontStyle: "italic",
};

const topTextStyle = {
  color: "mediumGray",
  fontWeight: "600",
  mt: "2",
};

const TextStyle = {
  fontFamily: "body",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: ".76px",
  lineHeight: "44px",
  mr: 1,
  textTransform: "uppercase",
};

const innerTextStyle = {
  color: "mediumGray",
  fontWeight: "600",
  mt: "1",
};

const iconTextStyle = {
  color: "mediumGray",
  fontWeight: "600",
  ml: "1",
};

const boxStyle = {
  flexGrow: 1,
};

const flexStyle = {
  flexWrap: "wrap",
  mt: 2,
};

const styleFilterButton = (enabled) => {
  const common = {
    background: "#ededed",
    border: "1px solid #ccc",
    padding: "10px 15px",
    borderRadius: "3px",
    cursor: "pointer",
  };
  if (enabled) {
    return {
      ...common,
      background: "#e5e5e5",
      boxShadow: "inset 0px 0px 5px #c1c1c1",
      outline: "none",
    };
  } else {
    return common;
  }
};

export {
  titleStyle,
  innerTextStyle,
  topTextStyle,
  iconTextStyle,
  boxStyle,
  flexStyle,
  TextStyle,
  GreffierMandatairesListStyle,
  styleFilterButton,
};
