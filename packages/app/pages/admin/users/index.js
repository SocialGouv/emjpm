import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";
import { AdminFilterBar } from "../../../src/components-v2/AdminFilterBar";
import { AdminFilterProvider } from "../../../src/components-v2/AdminFilterBar/context";
import { AdminUsers } from "../../../src/components-v2/AdminUsers";
import { LayoutAdmin } from "../../../src/components-v2/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminUsersPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <Heading1>Liste des utilisateurs</Heading1>
          <Flex
            sx={{
              mt: "2",
              flexWrap: "wrap"
            }}
          >
            <AdminFilterBar />
            <AdminUsers />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
};

export default withAuthSync(AdminUsersPage);
