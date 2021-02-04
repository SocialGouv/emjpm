import { Flex } from "rebass";

import { AdminFilterBar } from "~/containers/AdminFilterBar";
import { AdminFilterProvider } from "~/containers/AdminFilterBar/context";
import { AdminUsers } from "~/containers/AdminUsers";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AdminUsersPage() {
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
}

export default AdminUsersPage;
