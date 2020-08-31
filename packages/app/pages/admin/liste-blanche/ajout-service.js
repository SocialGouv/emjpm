import { BoxWrapper, Heading1 } from "@emjpm/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Link as StyledLink } from "rebass";

import { LayoutDirection } from "../../../src/components/Layout";
import { ServiceCreate } from "../../../src/components/Service";
import { withAuthSync } from "../../../src/util/auth";

const ListBlanchePage = () => {
  const router = useRouter();
  return (
    <LayoutDirection>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <Heading1 mb={4}>{"Ajout d'un service à la liste blanche"}</Heading1>
        <ServiceCreate
          onSuccess={async () => {
            await router.push(`/admin/liste-blanche`);
          }}
        />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(ListBlanchePage);
