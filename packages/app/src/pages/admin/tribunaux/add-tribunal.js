import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { AdminAddTribunal } from "~/components/AdminTribunaux/AdminAddTribunal";
import { LayoutAdmin } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

const AddTribunauxPage = () => {
  return (
    <LayoutAdmin hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1>{`Création d'un tribunal`}</Heading1>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2",
          }}
        >
          <AdminAddTribunal />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AddTribunauxPage);
