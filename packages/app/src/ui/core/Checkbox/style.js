const CheckboxInputStyle = () => {
  return {
    border: "0",
    clip: "rect(0 0 0 0)",
    clippath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  };
};

const CheckboxWrapperStyle = () => {
  return {
    display: "inline-block",
    fontFamily: "body",
    fontWeight: "600",
    verticalAlign: "middle",
  };
};

const CheckboxStyle = (props) => {
  return {
    bg: props.checked ? "primary" : "cardPrimary",
    border: "1px solid",
    borderColor: props.checked ? "primary" : "border",
    borderRadius: "default",
    height: "20px",
    mr: "2",
    padding: "4px",
    verticalAlign: "middle",
    width: "20px",
  };
};

const IconWrapperStyle = (props) => {
  return {
    display: props.checked ? "block" : "none",
    height: "10px",
    lineHeight: "8px",
    verticalAlign: ".125em",
  };
};

export {
  CheckboxInputStyle,
  CheckboxWrapperStyle,
  CheckboxStyle,
  IconWrapperStyle,
};
