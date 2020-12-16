import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { AdminFilterBar } from "~/components/AdminFilterBar";
import { AdminFilterProvider } from "~/components/AdminFilterBar/context";
import { AdminServices } from "~/components/AdminServices";
import { LayoutAdmin } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const AdminServicesPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <Heading1>Liste des services</Heading1>
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
};

export default withAuthSync(AdminServicesPage);
