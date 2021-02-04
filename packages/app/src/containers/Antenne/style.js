const antenneTitleStyle = {
  color: "lightGray",
  fontWeight: "bold",
  mb: "3",
  mt: "6px",
  textAlign: "center",
};

const numberStyle = {
  color: "lightGray",
  fontSize: 3,
  fontWeight: "bold",
  mr: "1",
};

const mesureStyle = {
  color: "textTertiary",
  fontSize: 1,
  fontWeight: "semibold",
};

const numberContainer = {
  alignItems: "flex-end",
  mb: "5px",
};

const subtitle = {
  color: "lightGray",
  fontSize: 1,
  fontWeight: "bold",
  lineHeight: "16px",
  mb: "2",
  mt: "4",
};

const preferenceText = {
  color: "mediumGray",
  fontSize: 1,
  fontWeight: "semibold",
  mb: "5px",
};

function availabilityIndicatorStyle(isAvailable) {
  return {
    bg: isAvailable ? "error" : "success",
    borderRadius: "default",
    height: "10px",
    mr: "1",
    width: "10px",
  };
}

export {
  antenneTitleStyle,
  numberStyle,
  mesureStyle,
  numberContainer,
  subtitle,
  preferenceText,
  availabilityIndicatorStyle,
};
