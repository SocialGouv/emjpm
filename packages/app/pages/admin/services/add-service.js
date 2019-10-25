import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";
import { LayoutAdmin } from "../../../src/components-v2/Layout";
import { withAuthSync } from "../../../src/util/auth";
import { AdminAddService } from "../../../src/components-v2/AdminServices/AdminAddService";

const AddServicePage = () => {
  return (
    <LayoutAdmin hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1>{`Création d'un tribunal`}</Heading1>
        <Flex
          sx={{
            mt: "2",
            flexWrap: "wrap"
          }}
        >
          <AdminAddService />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AddServicePage);
