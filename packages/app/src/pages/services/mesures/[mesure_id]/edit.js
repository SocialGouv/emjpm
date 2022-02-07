import { Flex } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { MesureProvider } from "~/containers/MesureContext";
import { MesureEdit } from "~/containers/MesureEdit";
import { ServiceMesureSidebar } from "~/containers/ServiceMesureSidebar";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { SkipToContent } from "~/components";

function EditMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <SkipToContent skipTo="edit_mesure_wrapper" />
      <MesureProvider mesureId={mesureId}>
        <LayoutServices>
          <BoxWrapper mt={1} id="edit_mesure_wrapper">
            <Flex flexDirection="column">
              <ServiceMesureSidebar mesureId={mesureId} />
              <MesureEdit />
            </Flex>
          </BoxWrapper>
        </LayoutServices>
      </MesureProvider>
    </>
  );
}

export default EditMesurePage;
