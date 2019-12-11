const SidebarStyle = {
  p: 4
};
const CardStyle = isImportant => {
  return {
    bg: isImportant ? "primary" : "#F2F5F9",
    borderRadius: "10px",
    color: isImportant ? "white" : "text",
    p: 2
  };
};

const description = isImportant => {
  return {
    color: isImportant ? "white" : "mediumGray",
    fontFamily: "body",
    fontSize: "12px",
    fontWeight: "600",
    mb: "4px"
  };
};

const icon = isImportant => {
  return {
    bg: isImportant ? "#00499E" : "#E5E9EE",
    borderRadius: "8px",
    height: "52px",
    minWidth: "40px",
    mr: "2",
    padding: "14px"
  };
};

const title = {
  "&:last-child": {
    mb: 0
  },
  fontFamily: "heading",
  fontWeight: "bold",
  mb: "5px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};

const partTitle = {
  fontFamily: "heading",
  fontWeight: "bold"
};

export { SidebarStyle, CardStyle, description, icon, title, partTitle };
