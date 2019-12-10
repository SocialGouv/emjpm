import styled from "@emotion/styled";
import { BoxWrapper, Card, Heading4 } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Link as StyledLink } from "rebass";

import { AdminServiceInformations } from "../../../src/components-v2/AdminServices/AdminServiceInformations";
import { LayoutAdmin } from "../../../src/components-v2/Layout";
import { MesureImportService } from "../../../src/components-v2/MesureImport";
import { withAuthSync } from "../../../src/util/auth";

const StyledTabs = styled(Tabs)({
  display: "flex"
});

StyledTabs.tabsRole = "Tabs";

const StyledTabList = styled(TabList, { shouldForwardProp: prop => prop === "children" })();

StyledTabList.tabsRole = "TabList";

const StyledTab = styled(Tab)({
  "&.react-tabs__tab--selected": {
    borderLeft: "4px solid rgb(0, 103, 234)",
    color: "rgb(0, 103, 234)"
  },
  borderLeft: "4px solid white",
  cursor: "pointer",
  fontWeight: "bold",
  outline: "none",
  paddingBottom: 16,
  paddingLeft: 32,
  paddingRight: 64,
  paddingTop: 16
});

StyledTab.tabsRole = "Tab";

const StyledTabPanel = styled(TabPanel)({
  "&.react-tabs__tab-panel--selected": {
    width: "100%"
  },
  minHeight: 600
});

StyledTabPanel.tabsRole = "TabPanel";

const Service = props => {
  const { serviceId } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/services">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <StyledTabs>
          <StyledTabList>
            <Card p={0} py={1} mr={4}>
              <StyledTab>Informations</StyledTab>
              <StyledTab>Import</StyledTab>
            </Card>
          </StyledTabList>
          <StyledTabPanel>
            <AdminServiceInformations serviceId={serviceId} />
          </StyledTabPanel>
          <StyledTabPanel>
            <Card>
              <Heading4 mb={2}>Selectionnez le fichier</Heading4>
              <MesureImportService id={serviceId} />
            </Card>
          </StyledTabPanel>
        </StyledTabs>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

Service.getInitialProps = async ({ query }) => {
  return { serviceId: query.service_id };
};

export default withAuthSync(Service);
