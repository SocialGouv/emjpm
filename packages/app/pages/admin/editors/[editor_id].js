import { BoxWrapper, Tab, TabList, TabPanel, Tabs } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminEditorApiLogs } from "../../../src/components/AdminEditors/AdminEditorApiLogs";
import { AdminEditorInformations } from "../../../src/components/AdminEditors/AdminEditorInformations";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const Editor = props => {
  const { editorId } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper>
        <Link href="/admin/users">
          <StyledLink my={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <Tabs>
          <TabList>
            <Tab>Informations</Tab>
            <Tab>API Logs</Tab>
          </TabList>
          <TabPanel>
            <AdminEditorInformations editorId={editorId} />
          </TabPanel>
          <TabPanel>
            <AdminEditorApiLogs editorId={editorId} />
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
