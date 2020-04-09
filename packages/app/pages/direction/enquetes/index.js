import { BoxWrapper, Heading2 } from "@emjpm/ui";
import Link from "next/link";
import React from "react";

import { Enquiries } from "../../../src/components/Enquiries";
import { LayoutDirection } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const Enquetes = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Heading2>Enquêtes</Heading2>
        <Link href="/direction/enquetes/create">Créer une enquête</Link>
        <Enquiries />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default withAuthSync(Enquetes);
