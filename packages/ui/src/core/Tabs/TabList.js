import styled from "@emotion/styled";
import * as ReactTabs from "react-tabs";

import { tabListStyle } from "./style";

const TabList = styled(ReactTabs.TabList, {
  shouldForwardProp: (prop) => prop === "children",
})(tabListStyle);

TabList.tabsRole = "TabList";

export { TabList };
