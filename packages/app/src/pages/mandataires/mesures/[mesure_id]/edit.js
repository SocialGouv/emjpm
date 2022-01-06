import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireMesureSidebar } from "~/containers/MandataireMesureSidebar";
import { MesureProvider } from "~/containers/MesureContext";
import { MesureEdit } from "~/containers/MesureEdit";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function EditMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <Helmet>
        <title>Edition de la mesure | e-MJPM</title>
      </Helmet>
      <MesureProvider mesureId={mesureId}>
        <LayoutMandataire>
          <BoxWrapper mt={1}>
            <Flex flexDirection="column">
              <MandataireMesureSidebar mesureId={mesureId} />
              <MesureEdit />
            </Flex>
          </BoxWrapper>
        </LayoutMandataire>
      </MesureProvider>
    </>
  );
}

export default EditMesurePage;
