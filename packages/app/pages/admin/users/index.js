import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { AdminFilterBar } from "../../../src/components/AdminFilterBar";
import { AdminFilterProvider } from "../../../src/components/AdminFilterBar/context";
import { AdminUsers } from "../../../src/components/AdminUsers";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminUsersPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <Heading1>Liste des utilisateurs</Heading1>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
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
