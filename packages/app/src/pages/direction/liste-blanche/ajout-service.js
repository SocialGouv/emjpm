import { useRouter } from "next/router";
import React from "react";
import { Link as StyledLink } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutDirection } from "~/components/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheServiceCreate } from "~/components/ListeBlanche";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const ListBlanchePage = () => {
  const router = useRouter();
  return (
    <LayoutDirection>
      <BoxWrapper mt={4} px={1}>
        <Link href="/direction/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>

        <HeadingTitle mb={4}>
          {"Ajout d'un engistrement à la liste blanche"}
        </HeadingTitle>
        <ListeBlancheServiceCreate
          onSuccess={async () => {
            await router.push("/direction/liste-blanche");
          }}
          handleCancel={async () => {
            await router.push("/direction/liste-blanche");
          }}
        />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(ListBlanchePage);
