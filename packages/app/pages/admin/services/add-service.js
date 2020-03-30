import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { AdminAddService } from "../../../src/components/AdminServices/AdminAddService";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AddServicePage = () => {
  return (
    <LayoutAdmin hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1>{`Création d'un service`}</Heading1>
        <Flex flexWrap="wrap" mt="2">
          <AdminAddService />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AddServicePage);
