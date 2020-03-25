import { BoxWrapper, Tab, TabList, TabPanel, Tabs } from "@emjpm/ui";
import React from "react";

import { IndividuelInformationAgrement } from "../../src/components/IndividuelInformationAgrement";
import { IndividuelInformationExercice } from "../../src/components/IndividuelInformationExercice";
import { LayoutMandataire } from "../../src/components/Layout";
import { MandataireInformations } from "../../src/components/MandataireInformations";
import { withAuthSync } from "../../src/util/auth";

const Informations = () => (
  <LayoutMandataire>
    <BoxWrapper mt={4}>
      <Tabs p={0}>
        <TabList>
          <Tab>{`Informations générales`}</Tab>
          <Tab>{`Agrément`}</Tab>
          <Tab>{`Modalité d'exercice`}</Tab>
          <Tab>{`Formation`}</Tab>
        </TabList>
        <TabPanel>
          <MandataireInformations />
        </TabPanel>
        <TabPanel>
          <IndividuelInformationAgrement />
        </TabPanel>
        <TabPanel>
          <IndividuelInformationExercice />
        </TabPanel>
        {/*
        <TabPanel>
          <MandataireInformationFormation />
        </TabPanel> */}
      </Tabs>
    </BoxWrapper>
  </LayoutMandataire>
);

export default withAuthSync(Informations);
