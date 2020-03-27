import { BoxWrapper, Heading1 } from "@emjpm/ui";
import Router from "next/router";
import React from "react";
import { Flex } from "rebass";

import { AdminFilterBar } from "../../../src/components/AdminFilterBar";
import { AdminFilterProvider } from "../../../src/components/AdminFilterBar/context";
import { AdminSatisfactionCampaigns } from "../../../src/components/AdminSatisfactionCampaigns";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const AdminSatisfactionCampaignsPage = () => {
  return (
    <AdminFilterProvider>
      <LayoutAdmin>
        <BoxWrapper mt={6} px="1">
          <Heading1>Liste des campagnes de satisfaction</Heading1>
          <Flex flexWrap="wrap" mt="2">
            <AdminFilterBar
              onAddButtonClick={() => Router.push("/admin/satisfaction_campaigns/create ")}
            />
            <AdminSatisfactionCampaigns />
          </Flex>
        </BoxWrapper>
      </LayoutAdmin>
    </AdminFilterProvider>
  );
};

export default withAuthSync(AdminSatisfactionCampaignsPage);
