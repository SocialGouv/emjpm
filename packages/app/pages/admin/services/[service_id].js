import { BoxWrapper, Heading4, Tab, TabList, TabPanel, Tabs } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminServiceMesures } from "../../../src/components/AdminServices";
import { AdminEditService } from "../../../src/components/AdminServices/AdminEditService";
import { AdminServiceInformations } from "../../../src/components/AdminServices/AdminServiceInformations";
import { LayoutAdmin } from "../../../src/components/Layout";
import { MesureImportPanel } from "../../../src/components/MesureImport";
import { withAuthSync } from "../../../src/util/auth";

const Service = (props) => {
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
            <Tab>Mesures</Tab>
            <Tab>Edition</Tab>
            <Tab>Import</Tab>
          </TabList>
          <TabPanel>
            <AdminServiceInformations serviceId={serviceId} />
          </TabPanel>
          <TabPanel>
            <AdminServiceMesures serviceId={serviceId} />
          </TabPanel>
          <TabPanel>
            <AdminEditService serviceId={serviceId} />
          </TabPanel>
          <TabPanel>
            <Heading4 mb={2}>Selectionnez le fichier</Heading4>
            <MesureImportPanel serviceId={serviceId} />
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
