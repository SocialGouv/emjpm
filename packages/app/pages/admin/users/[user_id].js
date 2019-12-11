import { BoxWrapper, Heading4, Tab, TabList, TabPanel, Tabs } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminUserInformations } from "../../../src/components/AdminUsers/AdminUserInformations";
import { LayoutAdmin } from "../../../src/components/Layout";
import { MesureImportMandataire } from "../../../src/components/MesureImport";
import { withAuthSync } from "../../../src/util/auth";

const User = props => {
  const { userId } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/users">
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
            <AdminUserInformations userId={userId} />
          </TabPanel>
          <TabPanel>
            <Heading4 mb={2}>Selectionnez le fichier</Heading4>
            <MesureImportMandataire id={userId} />
          </TabPanel>
        </Tabs>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

User.getInitialProps = async ({ query }) => {
  return { userId: query.user_id };
};

export default withAuthSync(User);
