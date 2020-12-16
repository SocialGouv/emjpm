import { BoxWrapper, Heading1 } from "@emjpm/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Link as StyledLink } from "rebass";

import { LayoutAdmin } from "~/components/Layout";
import { ListeBlancheServiceCreate } from "~/components/ListeBlanche";
import { withAuthSync } from "~/util/auth";

const ListBlanchePage = () => {
  const router = useRouter();
  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <Heading1 mb={4}>{"Ajout d'un service à la liste blanche"}</Heading1>
        <ListeBlancheServiceCreate
          onSuccess={async () => {
            await router.push(`/admin/liste-blanche`);
          }}
          handleCancel={async () => {
            await router.push("/admin/liste-blanche");
          }}
        />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(ListBlanchePage);
