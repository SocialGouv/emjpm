import { BoxWrapper, Heading1 } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { LayoutDirection } from "../../../src/components/Layout";
import { ListeBlanchePreposeCreate } from "../../../src/components/ListeBlanche";
import { withAuthSync } from "../../../src/util/auth";

const ListBlanchePage = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={4} px={1}>
        <Link href="/direction/liste-blanche">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <Heading1 mb={4}>
          {"Ajout d'un mandataire préposé à la liste blanche"}
        </Heading1>
        <ListeBlanchePreposeCreate />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(ListBlanchePage);
