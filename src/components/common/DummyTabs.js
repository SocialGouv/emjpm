import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const StyledTab = styled(Tab)`
  background-color: #ebeff2;
  padding: 10px 20px;
  top: 0;
  line-height: 42px;
  border: 0;
  border-radius: 0;
  border-left: ${props => (props.isFirst ? "none" : "1px solid #ddd")};
  transition: background 0.1s ease-out;
  &.react-tabs__tab--selected {
    background: white;
  }
  &:hover {
    background: #fafafa;
  }
`;

const IconWrapper = styled.div`
  min-width: 20px;
  color: black;
  display: inline-block;
  margin-right: 10px;
`;

// dummy tabs : pass an array of [{icon: ReactElelemnt, text: String, content: ReactElement}]
const DummyTabs = ({ tabs }) => (
  <Tabs style={{ background: "white" }}>
    <TabList style={{ background: "#d7dfe8", borderBottom: 0, marginBottom: 0 }}>
      {tabs.map((tab, i) => (
        <StyledTab isFirst={i === 0} className="react-tabs__tab" data-cy={tab.text} key={tab.text}>
          <IconWrapper>{tab.icon}</IconWrapper>
          {tab.text}
        </StyledTab>
      ))}
    </TabList>
    {tabs.map(tab => <TabPanel key={tab.text}>{tab.content}</TabPanel>)}
  </Tabs>
);

export default DummyTabs;
