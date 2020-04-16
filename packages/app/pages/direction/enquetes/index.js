import { BoxWrapper, Heading2 } from "@emjpm/ui";
import Link from "next/link";
import React from "react";

import { Enquetes } from "../../../src/components/Enquetes";
import { LayoutDirection } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const EnquetesPage = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Heading2>Enquêtes</Heading2>
        <Link href="/direction/enquetes/create">Créer une enquête</Link>
        <Enquetes />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(EnquetesPage);
