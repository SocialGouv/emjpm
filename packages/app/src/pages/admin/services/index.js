import { Flex, Box } from "rebass";

import { AdminFilterBar } from "~/containers/AdminFilterBar";
import SearchFilter from "~/containers/FilterWidgets/SearchFilter";
import { Provider as AdminFilterProvider } from "~/containers/FilterWidgets/context";
import { AdminServices } from "~/containers/AdminServices";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AdminServicesPage() {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={3} px="1">
          <HeadingTitle>Liste des services</HeadingTitle>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <AdminFilterBar>
              <Box>
                <Flex>
                  <SearchFilter />
                </Flex>
              </Box>
            </AdminFilterBar>
            <AdminServices />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
}

export default AdminServicesPage;
