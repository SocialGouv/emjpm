import React from "react";
import { Box } from "rebass";

import { Tab, TabList, TabPanel, Tabs } from ".";

export default {
  component: Tabs,
  title: "Core | Tabs"
};

export const TabsVertical = () => (
  <Box m={2} bg="background">
    <Tabs>
      <TabList>
        <Tab>Tab one</Tab>
        <Tab>Tab two</Tab>
      </TabList>
      <TabPanel>
        Tab one
      </TabPanel>
      <TabPanel>
        Tab two
      </TabPanel>
    </Tabs>
  </Box>
);
