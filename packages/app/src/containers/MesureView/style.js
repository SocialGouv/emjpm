export const titleStyle = {
  color: "mediumGray",
  fontSize: "2",
  fontStyle: "italic",
};

export const subtitle = {
  color: "#555555",
  fontSize: "12px",
  fontWeight: "500",
  lineHeight: "1.4",
};

export const content = {
  color: "#404040",
  fontSize: 1,
  fontWeight: "600",
  lineHeight: "1.4",
  mb: 1,
  mt: "1px",
};

export const title = { ":first-letter": { textTransform: "capitalize" } };

export const statusBox = (status) => ({
  backgroundColor:
    status === "en_attente"
      ? "warning"
      : status === "eteinte"
      ? "gray"
      : "primary",
  borderRadius: "2px",
  color: "#ffffff",
  display: "inline-block",
  fontWeight: "bold",
  margin: "auto",
  padding: "4px 10px",
});
