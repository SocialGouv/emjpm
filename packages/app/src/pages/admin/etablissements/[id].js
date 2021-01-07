import React from "react";
import { Box } from "rebass";

import { Link } from "~/components/Commons";
import { EtablissementView } from "~/components/Etablissement";
import { LayoutAdmin } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

export const EditEtablissementPage = () => {
  const { id } = useParams();

  return (
    <LayoutAdmin>
      <BoxWrapper mt={4} px={1}>
        <Box mb="4">
          <Link to="/admin/etablissements">&larr; Retour</Link>
        </Box>
        <EtablissementView id={id} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default EditEtablissementPage;
