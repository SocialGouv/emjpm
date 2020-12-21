import React from "react";
import { Flex } from "rebass";

import { AdminFilterBar } from "~/components/AdminFilterBar";
import { AdminFilterProvider } from "~/components/AdminFilterBar/context";
import { AdminUsers } from "~/components/AdminUsers";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const AdminUsersPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <HeadingTitle>Liste des utilisateurs</HeadingTitle>
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
