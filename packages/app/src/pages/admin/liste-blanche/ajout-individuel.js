import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutAdmin } from "~/components/Layout";
import { ListeBlancheIndividuelCreate } from "~/components/ListeBlanche";
import { withAuthSync } from "~/util/auth";

const ListBlanchePage = () => {
  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <HeadingTitle mb={4}>
          {"Ajout d'un mandataire individuel à la liste blanche"}
        </HeadingTitle>
        <ListeBlancheIndividuelCreate />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(ListBlanchePage);
