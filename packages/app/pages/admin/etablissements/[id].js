import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

import { Link } from "../../../src/components/Commons";
import { EtablissementView } from "../../../src/components/Etablissement";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

export const EditEtablissementPage = (props) => {
  const { id } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Box mb="4">
          <Link href="/admin/etablissements">&larr; Retour</Link>
        </Box>
        <EtablissementView id={id} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

EditEtablissementPage.getInitialProps = async ({ query }) => {
  return { id: query.id };
};

export default withAuthSync(EditEtablissementPage);
