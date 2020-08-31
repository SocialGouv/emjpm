import { BoxWrapper, Heading1 } from "@emjpm/ui";
import React from "react";

import { LayoutDirection } from "../../../src/components/Layout";
// import { ListeBlancheServiceCreate } from "../../../src/components/ListeBlanche";
import { withAuthSync } from "../../../src/util/auth";

const ListBlanchePage = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={4} px={1}>
        <Heading1 mb={4}>{"Ajout d'un engistrement à la liste blanche"}</Heading1>
        {/* <ListeBlancheServiceCreate /> */}
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(ListBlanchePage);
