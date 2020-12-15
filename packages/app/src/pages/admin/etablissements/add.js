import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { EtablissementImport } from "~/components/Etablissement";
import { LayoutAdmin } from "~/components/Layout";
import { withAuthSync } from "~/util/auth";

export const AddEtablissementPage = () => {
  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/etablissements">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <EtablissementImport />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default withAuthSync(AddEtablissementPage);
