import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminSatisfactionCampaignInformations } from "../../../src/components/AdminSatisfactionCampaigns/AdminSatisfactionCampaignInformations";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const Editor = props => {
  const { id } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper>
        <Link href="/admin/satisfaction_campaigns" passHref>
          <StyledLink my={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <AdminSatisfactionCampaignInformations id={id} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

Editor.getInitialProps = async ({ query }) => {
  return { id: query.satisfaction_campaign_id };
};

export default withAuthSync(Editor);
