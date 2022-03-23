export const listStyle = (i) => ({
  alignItems: "center",
  bg: i % 2 ? "" : "muted",
  borderRadius: 4,
  mb: 1,
  px: 2,
  py: 4,
});

export const listEmailStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: 250,
};

export const listIdStyle = {
  color: "textSecondary",
  width: 50,
};

export const listDateStyle = {
  color: "textSecondary",
  width: 300,
};

export const listActionStyle = {
  ":hover": {
    color: "text",
  },
  color: "primary",
  cursor: "pointer",
  mx: 2,
  width: 24,
};

export const listActionsStyle = {
  marginLeft: "auto",
};

export const listAdminStyle = {
  mr: 4,
  width: 200,
};
