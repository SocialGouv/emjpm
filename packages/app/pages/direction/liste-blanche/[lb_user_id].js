import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { LayoutAdmin } from "../../../src/components/Layout";
import { ListeBlancheDetail } from "../../../src/components/ListeBlancheDetail/ListeBlancheDetail";
import { withAuthSync } from "../../../src/util/auth";

const ListeBlancheDetailPage = (props) => {
  const { lbUserId } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <ListeBlancheDetail lbUserId={lbUserId} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

ListeBlancheDetailPage.getInitialProps = async ({ query }) => {
  return { lbUserId: query.lb_user_id };
};

export default withAuthSync(ListeBlancheDetailPage);
