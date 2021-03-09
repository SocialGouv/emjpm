import "react-tabs/style/react-tabs.css";

const tabsStyle = {};

const tabListStyle = {};

const tabStyle = {
  "&.react-tabs__tab--selected": {
    borderLeft: "2px solid #0067EA",
    color: "#0067EA",
  },
  cursor: "pointer",
};

const tabPanelStyle = {};

export { tabStyle, tabsStyle, tabPanelStyle, tabListStyle };
