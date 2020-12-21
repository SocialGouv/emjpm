import React from "react";
import { Flex } from "rebass";

import { AdminAddTribunal } from "~/components/AdminTribunaux/AdminAddTribunal";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const AddTribunauxPage = () => {
  return (
    <LayoutAdmin hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle>{`Création d'un tribunal`}</HeadingTitle>
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
