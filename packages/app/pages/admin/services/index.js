import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import Router from "next/router";
import React from "react";
import { Flex } from "rebass";

import { AdminFilterBar } from "../../../src/components-v2/AdminFilterBar";
import { AdminFilterProvider } from "../../../src/components-v2/AdminFilterBar/context";
import { AdminServices } from "../../../src/components-v2/AdminServices";
import { LayoutAdmin } from "../../../src/components-v2/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminServicesPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <Heading1>Liste des services</Heading1>
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2"
            }}
          >
            <AdminFilterBar onAddButtonClick={() => Router.push("/admin/services/add-service ")} />
            <AdminServices />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
};

export default withAuthSync(AdminServicesPage);
