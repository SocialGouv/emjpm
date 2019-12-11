import { BoxWrapper, Heading4, Tab, TabList, TabPanel, Tabs } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminServiceInformations } from "../../../src/components-v2/AdminServices/AdminServiceInformations";
import { LayoutAdmin } from "../../../src/components-v2/Layout";
import { MesureImportService } from "../../../src/components-v2/MesureImport";
import { withAuthSync } from "../../../src/util/auth";

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
        <Tabs>
          <TabList>
            <Tab>Informations</Tab>
            <Tab>Import</Tab>
          </TabList>
          <TabPanel>
            <AdminServiceInformations serviceId={serviceId} />
          </TabPanel>
          <TabPanel>
            <Heading4 mb={2}>Selectionnez le fichier</Heading4>
            <MesureImportService id={serviceId} />
          </TabPanel>
        </Tabs>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

Service.getInitialProps = async ({ query }) => {
  return { serviceId: query.service_id };
};

export default withAuthSync(Service);
