const tabsStyle = {
  alignItems: "flex-start",
  display: "flex",
};

const tabListStyle = {
  background: "white",
  marginRight: 24,
  paddingBottom: 12,
  paddingTop: 12,
  width: 250,
};

const tabStyle = {
  "&.react-tabs__tab--selected": {
    borderLeft: "4px solid #0067EA",
    color: "#0067EA",
  },
  borderLeft: "4px solid white",
  cursor: "pointer",
  fontWeight: "bold",
  outline: "none",
  paddingBottom: 12,
  paddingLeft: 32,
  paddingRight: 64,
  paddingTop: 12,
};

const tabPanelStyle = {
  "&.react-tabs__tab-panel--selected": {
    padding: 12,
    width: "100%",
  },
  background: "white",
  minHeight: 600,
};

export { tabStyle, tabsStyle, tabPanelStyle, tabListStyle };
