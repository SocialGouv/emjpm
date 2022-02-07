import { Flex, Box } from "rebass";
import { Helmet } from "react-helmet";

import { AdminFilterBar } from "~/containers/AdminFilterBar";
import SearchFilter from "~/containers/FilterWidgets/SearchFilter";
import { Provider as AdminFilterProvider } from "~/containers/FilterWidgets/context";
import { AdminUsers } from "~/containers/AdminUsers";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function AdminUsersPage() {
  return (
    <>
      <Helmet>
        <title>Liste des utilisateurs | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="search_filter" />
      <AdminFilterProvider>
        <LayoutAdmin>
          <BoxWrapper mt={3} px="1">
            <HeadingTitle>Liste des utilisateurs</HeadingTitle>
            <AdminFilterBar>
              <Box>
                <Flex>
                  <SearchFilter />
                </Flex>
              </Box>
            </AdminFilterBar>
            <AdminUsers />
          </BoxWrapper>
        </LayoutAdmin>
      </AdminFilterProvider>
    </>
  );
}

export default AdminUsersPage;
