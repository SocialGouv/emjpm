import { BoxWrapper, Heading4, Tab, TabList, TabPanel, Tabs } from "@emjpm/ui";
import Link from "next/link";
import React, { Fragment } from "react";
import { Link as StyledLink } from "rebass";

import { AdminUserInformations } from "../../../src/components/AdminUsers/AdminUserInformations";
import AdminUsersMesures from "../../../src/components/AdminUsers/AdminUsersMesures";
import { LayoutAdmin } from "../../../src/components/Layout";
import { MesureImportPanel } from "../../../src/components/MesureImport";
import { isMandataire } from "../../../src/util";
import { withAuthSync } from "../../../src/util/auth";

const UserInformationTabPanel = userId => {
  return <AdminUserInformations userId={userId} />;
};

const MandataireImportTabPanel = userId => (
  <Fragment>
    <Heading4 mb={2}>Selectionnez le fichier</Heading4>
    <MesureImportPanel mandataireUserId={userId} />
  </Fragment>
);

const getTabInfos = (type, active) => {
  const tabInfos = [];
  tabInfos.push({
    createPanel: UserInformationTabPanel,
    title: "Information"
  });

  if (active && isMandataire(type)) {
    tabInfos.push({
      // eslint-disable-next-line react/display-name
      createPanel: id => {
        return <AdminUsersMesures userId={id} />;
      },
      title: "Mesures"
    });
  }

  if (active && isMandataire(type)) {
    tabInfos.push({
      createPanel: MandataireImportTabPanel,
      title: "Import"
    });
  }
  return tabInfos;
};

const User = props => {
  const { userId, type, active } = props;
  const tabInfos = getTabInfos(type, active);

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
            {tabInfos.map((el, index) => (
              <Tab key={index}>{el.title}</Tab>
            ))}
          </TabList>
          {tabInfos.map((el, index) => (
            <TabPanel key={index}>{el.createPanel(userId)}</TabPanel>
          ))}
        </Tabs>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

User.getInitialProps = async ({ query }) => {
  return { active: query.active, type: query.type, userId: query.user_id };
};

export default withAuthSync(User);
