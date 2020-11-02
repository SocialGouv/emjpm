const AdminUsersStyle = {
  bg: "blue",
};

const cardStyle = (active) => {
  return {
    borderLeft: active ? "2px solid green" : "2px solid red",
    mb: "1",
    overflow: "hidden",
    pl: "16px",
    position: "relative",
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

const activateButtonStyle = (active) => {
  return active
    ? {}
    : {
        borderColor: "success",
        color: "success",
      };
};

export {
  AdminUsersStyle,
  cardStyle,
  labelStyle,
  descriptionStyle,
  activateButtonStyle,
};
