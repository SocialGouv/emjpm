import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { PageTracker } from "./PageTracker";

const IconWrapper = styled.div`
  min-width: 15px;
  color: black;
  display: inline-block;
  margin-right: 8px;
  svg {
    margin-top: -4px;
    width: 15px;
    vertical-align: middle;
  }
`;

const StyledTab = styled(Tab)`
  background-color: #ebeff2;
  padding: 10px 15px;
  margin-top: 20px
  top: 0;
  line-height: 42px;
  border: 0;
  border-radius: 0;
  transition: background 0.1s ease-out;
  border-left: 1px solid #ddd;
  &:first-child() {
    border-left: none;
  }
  & ${IconWrapper.selector} svg {
    opacity: 0.5;
  }
  &.react-tabs__tab--selected {
    background: white;
    & ${IconWrapper.selector} svg {
      opacity: 1;
    }
  }
  &:hover {
    background: #fafafa;
  }
`;

// dummy tabs : pass an array of [{icon: ReactElelemnt, text: String, content: ReactElement}]

const DummyTabs = ({ tabs, onSelect, activeTabIndex }) => (
  <Tabs
    selectedIndex={activeTabIndex}
    onSelect={activeTabIndex => onSelect(activeTabIndex)}
    style={{ background: "white" }}
  >
    <TabList style={{ background: "#cad4de", borderBottom: 0, marginBottom: 0 }}>
      {tabs.map(tab => (
        <StyledTab className="react-tabs__tab" data-cy={tab.text} key={tab.text}>
          <IconWrapper>{tab.icon}</IconWrapper>
          {tab.text}
        </StyledTab>
      ))}
    </TabList>
    {tabs.map(tab => (
      <TabPanel key={tab.text}>
        <PageTracker url={tab.url} />
        <Head>
          <title>{tab.text}</title>
        </Head>
        {tab.content}
      </TabPanel>
    ))}
  </Tabs>
);

export default DummyTabs;
