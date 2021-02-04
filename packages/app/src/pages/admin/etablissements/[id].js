import { Box } from "rebass";

import { Link } from "~/containers/Commons";
import { EtablissementView } from "~/containers/Etablissement";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

export function EditEtablissementPage() {
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
}

export default EditEtablissementPage;
