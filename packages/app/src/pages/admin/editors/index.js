import { BoxWrapper, Heading1 } from "@emjpm/ui";
import Router from "next/router";
import React from "react";
import { Flex } from "rebass";

import { AdminEditorRequest, AdminEditors } from "~/components/AdminEditors";
import { AdminFilterBar } from "~/components/AdminFilterBar";
import { AdminFilterProvider } from "~/components/AdminFilterBar/context";
import { LayoutAdmin } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const AdminEditorsPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <Heading1>Liste des éditeurs</Heading1>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <AdminFilterBar
              onAddButtonClick={() => Router.push("/admin/editors/create ")}
            />
            <AdminEditors />
            <AdminEditorRequest />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
};

export default withAuthSync(AdminEditorsPage);
