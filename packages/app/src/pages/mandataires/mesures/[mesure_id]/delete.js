import { Flex } from "rebass";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireMesureSidebar } from "~/containers/MandataireMesureSidebar";
import { MesureProvider } from "~/containers/MesureContext";
import { MesureDelete } from "~/containers/MesureDelete";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function DeleteMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutMandataire>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <MandataireMesureSidebar mesureId={mesureId} />
            <MesureDelete />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </MesureProvider>
  );
}

export default DeleteMesurePage;
