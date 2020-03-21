import { BoxWrapper, Tab, TabList, TabPanel, Tabs } from "@emjpm/ui";
import React from "react";

import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireAgrement } from "../../src/components/MandataireAgrement";
import { MandataireInformations } from "../../src/components/MandataireInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => (
  <LayoutMandataire>
    <BoxWrapper mt={4}>
      <Tabs p={0}>
        <TabList>
          <Tab>{`Informations générales`}</Tab>
          <Tab>{`Agrément`}</Tab>
        </TabList>
        <TabPanel>
          <MandataireInformations />
        </TabPanel>
        <TabPanel>
          <MandataireAgrement />
        </TabPanel>
      </Tabs>
    </BoxWrapper>
  </LayoutMandataire>
);

export default withAuthSync(Informations);
