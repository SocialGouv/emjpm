import { Flex } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { MesureProvider } from "~/containers/MesureContext";
import { MesureDelete } from "~/containers/MesureDelete";
import { ServiceMesureSidebar } from "~/containers/ServiceMesureSidebar";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { SkipToContent } from "../../../../components";

function DeleteMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <SkipToContent skipTo="delete_mesure_wrapper" />
      <MesureProvider mesureId={mesureId}>
        <LayoutServices>
          <BoxWrapper mt={1} id="delete_mesure_wrapper">
            <Flex flexDirection="column">
              <ServiceMesureSidebar mesureId={mesureId} />
              <MesureDelete />
            </Flex>
          </BoxWrapper>
        </LayoutServices>
      </MesureProvider>
    </>
  );
}

export default DeleteMesurePage;
