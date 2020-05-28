import { BoxWrapper } from "@emjpm/ui";
import React from "react";

import { LayoutAdmin } from "../../../src/components/Layout";
import { ListeBlanche } from "../../../src/components/ListeBlanche";
import { withAuthSync } from "../../../src/util/auth";

const ListBlanchePage = () => (
  <LayoutAdmin>
    <BoxWrapper mt={4} px={1}>
      <ListeBlanche />
    </BoxWrapper>
  </LayoutAdmin>
);

export default withAuthSync(ListBlanchePage);
