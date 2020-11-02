import { BoxWrapper, Heading1 } from "@emjpm/ui";
import Router from "next/router";
import React from "react";
import { Flex } from "rebass";

import {
  AdminEditorRequest,
  AdminEditors,
} from "../../../src/components/AdminEditors";
import { AdminFilterBar } from "../../../src/components/AdminFilterBar";
import { AdminFilterProvider } from "../../../src/components/AdminFilterBar/context";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

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
