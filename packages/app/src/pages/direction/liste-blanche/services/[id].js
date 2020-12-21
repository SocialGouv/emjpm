import { useRouter } from "next/router";
import React from "react";
import { Link as StyledLink } from "rebass";

import { LayoutDirection } from "~/components/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheServiceUpdate } from "~/components/ListeBlanche";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const ListeBlancheDetailPage = (props) => {
  const { id } = props;
  const router = useRouter();

  return (
    <LayoutDirection>
      <BoxWrapper mt={4} px={1}>
        <Link href="/direction/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>

        <ListeBlancheServiceUpdate
          serviceId={id}
          onSuccess={async () => {
            await router.push("/direction/liste-blanche");
            window.scrollTo(0, 0);
          }}
          handleCancel={async () => {
            await router.push("/direction/liste-blanche");
            window.scrollTo(0, 0);
          }}
        />
      </BoxWrapper>
    </LayoutDirection>
  );
};

ListeBlancheDetailPage.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default withAuthSync(ListeBlancheDetailPage);
