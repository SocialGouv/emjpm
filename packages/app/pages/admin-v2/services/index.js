import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";
import { AdminServices } from "../../../src/components-v2/AdminServices";
import { LayoutAdmin } from "../../../src/components-v2/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminServicesPage = () => {
  return (
    <LayoutAdmin>
      <BoxWrapper mt={6} px="1">
        <Heading1>Toutes vos mesures</Heading1>
        <Flex
          sx={{
            mt: "2",
            flexWrap: "wrap"
          }}
        >
          <AdminServices />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AdminServicesPage);
