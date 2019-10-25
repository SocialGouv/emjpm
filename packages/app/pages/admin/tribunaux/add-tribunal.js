import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";
import { LayoutAdmin } from "../../../src/components-v2/Layout";
import { withAuthSync } from "../../../src/util/auth";
import { AdminAddTribunal } from "../../../src/components-v2/AdminTribunaux/AdminAddTribunal";

const AddTribunauxPage = () => {
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
          <AdminAddTribunal />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AddTribunauxPage);
