import styled from "@emotion/styled";
import * as ReactTabs from "react-tabs";

import { tabsStyle } from "./style";

const Tabs = styled(ReactTabs.Tabs)(tabsStyle);

Tabs.tabsRole = "Tabs";

export { Tabs };
