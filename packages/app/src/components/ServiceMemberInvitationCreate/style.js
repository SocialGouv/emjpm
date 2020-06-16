export const listStyle = (i) => ({
  borderRadius: 4,
  alignItems: "center",
  bg: i % 2 ? "" : "muted",
  px: 2,
  py: 4,
  mb: 1,
});

export const listEmailStyle = {
  textOverflow: "ellipsis",
  overflow: "hidden",
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
  width: 24,
  mx: 2,
  cursor: "pointer",
  color: "primary",
  ":hover": {
    color: "text",
  },
};

export const listActionsStyle = {
  marginLeft: "auto",
};

export const listAdminStyle = {
  width: 200,
  mr: 4,
};
