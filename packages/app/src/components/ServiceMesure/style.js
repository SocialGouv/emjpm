export const TYPES = {
  eteinte: "#7EA3AA",
  en_attente: "#F4AF00",
  en_cours: "#2DA0FB",
};

export const titleStyle = {
  color: "mediumGray",
  fontSize: "2",
  fontStyle: "italic",
};

export const subtitle = {
  color: "mediumGray",
  fontWeight: "500",
  fontSize: "12px",
  lineHeight: "1.4",
};

export const content = {
  color: "black",
  fontSize: 1,
  fontWeight: "600",
  lineHeight: "1.4",
  mt: "1px",
  mb: 1,
};

export const boxStyle = {
  width: "50%",
};

export const flexStyle = {
  flexWrap: "wrap",
  mt: 5,
};

export const statusStyle = (status) => {
  return {
    color: TYPES[status],
    display: "inline-block",
    fontSize: 1,
  };
};

export const statusBox = {
  padding: "4px 10px",
  margin: "auto",
  display: "inline-block",
  borderRadius: "2px",
  color: "#ffffff",
  fontWeight: "bold",
  backgroundColor: "#2DA0FB",
};
