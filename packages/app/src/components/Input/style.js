function InputWrapperStyle(props) {
  return {
    // bg: props.readOnly ? "#f8fafc" : "transparent",
    border: "1px solid",
    borderColor: () => {
      if (props.isFocus) return "primary";
      if (props.isValid) return "success";
      if (props.hasError) return "error";
      return "border";
    },

    borderRadius: "default",
    boxShadow: "none",
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "1",
    height: props.size === "small" ? "44px" : "54px",
    isolation: "isolate",
    position: "relative",
    width: "100%",
    zIndex: 0,
  };
}

function InputStyle(props) {
  return {
    bg: "transparent",
    border: "0",
    boxShadow: "none",
    color: "text",
    fontSize: "1",
    fontWeight: props.isActive ? "600" : "500",
    height: props.size === "small" ? "26px" : "30px",
    lineHeight: props.size === "small" ? "10px" : "20px",
    opacity: props.readOnly || props.isActive ? "1" : "0",
    outline: props.outline ? props.outline : "none",
    pl: "12px",
    pr: "12px",
    mt: props.size === "small" ? "13px" : "18px",
    pb: "10px",
    position: "relative",
    pt: props.isActive ? "5px" : "0",
    transition: "150ms ease-in-out all",
    width: "100%",
    zIndex: props.isActive ? 1 : 0,
  };
}

function LabelStyle({ isActive, size }) {
  return {
    color: () => {
      if (isActive) return "primary";
      return "textSecondary";
    },
    fontSize: () => {
      if (isActive) return size === "small" ? "10px" : "0";
      return "1";
    },
    fontWeight: "600",
    height: size === "small" ? "42px" : "52px",
    left: "0",
    lineHeight: size === "small" ? "22px" : "32px",
    position: "absolute",
    pt: "8px",
    px: "2",
    top: isActive ? "-12px" : "0px",
    transition: "150ms ease-in-out all",
    width: "100%",
    zIndex: 0,
  };
}

export { InputWrapperStyle, InputStyle, LabelStyle };
