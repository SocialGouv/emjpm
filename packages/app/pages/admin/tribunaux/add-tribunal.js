import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { AdminAddTribunal } from "../../../src/components/AdminTribunaux/AdminAddTribunal";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AddTribunauxPage = () => {
  return (
    <LayoutAdmin hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1>{`Création d'un tribunal`}</Heading1>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2"
          }}
        >
          <AdminAddTribunal />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AddTribunauxPage);
