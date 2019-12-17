const TYPES = {
  "Mesure éteinte": "#7EA3AA",
  "Mesure en attente": "#F4AF00",
  "Mesure en cours": "#2DA0FB"
};

const titleStyle = {
  color: "mediumGray",
  fontSize: "2",
  fontStyle: "italic"
};

const subtitle = {
  color: "mediumGray",
  fontWeight: "500",
  fontSize: "12px",
  lineHeight: "1.4"
};

const content = {
  color: "black",
  fontSize: 1,
  fontWeight: "600",
  lineHeight: "1.4",
  mt: "1px",
  mb: 1
};

const boxStyle = {
  width: "50%"
};

const flexStyle = {
  flexWrap: "wrap",
  mt: 5
};

const statusStyle = status => {
  return {
    color: TYPES[status],
    display: "inline-block",
    fontSize: 1
  };
};

export { titleStyle, content, subtitle, boxStyle, flexStyle, statusStyle };
