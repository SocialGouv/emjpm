import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { AdminSatisfactionCampaignCreate } from "../../../src/components/AdminSatisfactionCampaigns/AdminSatisfactionCampaignCreate";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminEditorsCreatePage = () => {
  return (
    <LayoutAdmin hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <Heading1>{`Création d'une campagne de satisfaction`}</Heading1>
        <Flex flexWrap="wrap" mt="2">
          <AdminSatisfactionCampaignCreate />
        </Flex>
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AdminEditorsCreatePage);
