const RadioInputStyle = () => {
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

const RadioWrapperStyle = () => {
  return {
    display: "inline-block",
    fontFamily: "body",
    fontWeight: "600",
    verticalAlign: "middle",
  };
};

const RadioStyle = (props) => {
  return {
    bg: "cardPrimary",
    border: "1px solid",
    borderColor: props.checked ? "primary" : "border",
    borderRadius: "circle",
    cursor: !props.disabled ? "pointer" : "normal",
    height: "20px",
    mr: "2",
    padding: "4x",
    verticalAlign: "middle",
    width: "20px",
  };
};

const InnerRadioStyle = (props) => {
  return {
    bg: props.checked ? "primary" : "cardPrimary",
    borderRadius: "circle",
    height: "10px",
    margin: "4px",
    width: "10px",
  };
};

export { RadioInputStyle, RadioWrapperStyle, RadioStyle, InnerRadioStyle };
