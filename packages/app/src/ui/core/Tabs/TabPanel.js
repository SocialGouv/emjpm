import styled from "@emotion/styled";
import * as ReactTabs from "react-tabs";

import { tabPanelStyle } from "./style";

const TabPanel = styled(ReactTabs.TabPanel)(tabPanelStyle);

TabPanel.tabsRole = "TabPanel";

export { TabPanel };
