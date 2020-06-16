import styled from '@emotion/styled';
import * as ReactTabs from 'react-tabs';

import { tabStyle } from './style';

const Tab = styled(ReactTabs.Tab)(tabStyle);

Tab.tabsRole = 'Tab';

export { Tab };
