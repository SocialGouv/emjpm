import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { LayoutDirection } from "../../../src/components/Layout";
import { ListeBlancheAjoutPrepose } from "../../../src/components/ListeBlancheAjout";
import { withAuthSync } from "../../../src/util/auth";

const ListBlanchePage = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={4} px={1}>
        <Heading1>{"Ajout d'un engistrement à la liste blanche"}</Heading1>
        <ListeBlancheAjoutPrepose />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(ListBlanchePage);
