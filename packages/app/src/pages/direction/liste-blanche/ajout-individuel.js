import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Link as StyledLink } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutDirection } from "~/components/Layout";
import { Link } from "~/components/Link";
import { ListeBlancheIndividuelCreate } from "~/components/ListeBlanche";
import { withAuthSync } from "~/util/auth";

const ListBlanchePage = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={4} px={1}>
        <Link href="/direction/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <HeadingTitle mb={4}>
          {"Ajout d'un mandataire individuel à la liste blanche"}
        </HeadingTitle>
        <ListeBlancheIndividuelCreate />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(ListBlanchePage);
