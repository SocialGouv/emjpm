import { BoxWrapper, Tab, TabList, TabPanel, Tabs } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminEditorActivity } from "../../../src/components/AdminEditors/AdminEditorActivity";
import { AdminEditorInformations } from "../../../src/components/AdminEditors/AdminEditorInformations";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const Editor = props => {
  const { editorId } = props;

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
            <Tab>Activité</Tab>
          </TabList>
          <TabPanel>
            <AdminEditorInformations editorId={editorId} />
          </TabPanel>
          <TabPanel>
            <AdminEditorActivity editorId={editorId} />
          </TabPanel>
        </Tabs>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

Editor.getInitialProps = async ({ query }) => {
  return { editorId: query.editor_id };
};

export default withAuthSync(Editor);
