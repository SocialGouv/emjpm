import { Flex } from "rebass";

import { AdminFilterBar } from "~/containers/AdminFilterBar";
import { AdminFilterProvider } from "~/containers/AdminFilterBar/context";
import { AdminServices } from "~/containers/AdminServices";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function AdminServicesPage() {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <HeadingTitle>Liste des services</HeadingTitle>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <AdminFilterBar />
            <AdminServices />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
}

export default AdminServicesPage;
