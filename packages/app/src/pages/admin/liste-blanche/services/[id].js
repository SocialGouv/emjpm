import { useRouter } from "next/router";
import React from "react";
import { Link as StyledLink } from "rebass";

import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheServiceUpdate } from "~/components/ListeBlanche";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const ListeBlancheDetailPage = (props) => {
  const { id } = props;
  const router = useRouter();

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>

        <ListeBlancheServiceUpdate
          serviceId={id}
          onSuccess={async () => {
            await router.push("/admin/liste-blanche");
            window.scrollTo(0, 0);
          }}
          handleCancel={async () => {
            await router.push("/admin/liste-blanche");
            window.scrollTo(0, 0);
          }}
        />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

ListeBlancheDetailPage.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default withAuthSync(ListeBlancheDetailPage);
