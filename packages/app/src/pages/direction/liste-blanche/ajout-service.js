import { BoxWrapper, Heading1 } from "@emjpm/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Link as StyledLink } from "rebass";

import { LayoutDirection } from "~/components/Layout";
import { ListeBlancheServiceCreate } from "~/components/ListeBlanche";
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

        <Heading1 mb={4}>
          {"Ajout d'un engistrement à la liste blanche"}
        </Heading1>
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
