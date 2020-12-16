import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { AdminFilterBar } from "~/components/AdminFilterBar";
import { AdminFilterProvider } from "~/components/AdminFilterBar/context";
import { AdminUsers } from "~/components/AdminUsers";
import { LayoutAdmin } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const AdminUsersPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <Heading1>Liste des utilisateurs</Heading1>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <AdminFilterBar userTypeFilter />
            <AdminUsers />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
};

export default withAuthSync(AdminUsersPage);
