import "react-tabs/style/react-tabs.css";

const tabsStyle = {};

const tabListStyle = {
  marginBottom: "1px",
};

const tabStyle = {
  "&.react-tabs__tab--selected": {
    borderLeft: "2px solid #0072ca",
    color: "#0072ca",
  },
  cursor: "pointer",
};

const tabPanelStyle = {};

export { tabStyle, tabsStyle, tabPanelStyle, tabListStyle };
