import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Link as StyledLink } from "rebass";

import { LayoutAdmin } from "../../../src/components/Layout";
import { ListeBlancheDetail } from "../../../src/components/ListeBlancheDetail/ListeBlancheDetail";
import { withAuthSync } from "../../../src/util/auth";

const ListeBlancheDetailPage = (props) => {
  const { lbUserId } = props;
  const router = useRouter();

  async function handleSubmit() {
    await router.push("/direction/liste-blanche");
    window.scrollTo(0, 0);
  }
  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/direction/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <ListeBlancheDetail lbUserId={lbUserId} handleSubmit={handleSubmit} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

ListeBlancheDetailPage.getInitialProps = async ({ query }) => {
  return { lbUserId: query.lb_user_id };
};

export default withAuthSync(ListeBlancheDetailPage);
