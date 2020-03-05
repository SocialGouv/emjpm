import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminCampaignsPage = () => (
  <LayoutAdmin>
    <BoxWrapper mt={6} px="1">
      <Heading1>Liste des éditeurs</Heading1>
      <Flex
        sx={{
          flexWrap: "wrap",
          mt: "2"
        }}
      >
        Campaigns
      </Flex>
    </BoxWrapper>
  </LayoutAdmin>
);

export default withAuthSync(AdminCampaignsPage);
