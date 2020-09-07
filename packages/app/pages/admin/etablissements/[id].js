import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { EtablissementEdit } from "../../../src/components/Etablissement";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

export const EditEtablissementPage = (props) => {
  const { id } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Link href="/admin/etablissements">
          <StyledLink mb={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <EtablissementEdit id={id} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

EditEtablissementPage.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default withAuthSync(EditEtablissementPage);
