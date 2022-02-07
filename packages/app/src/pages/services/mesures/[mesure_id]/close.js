import { Flex } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { MesureClose } from "~/containers/MesureClose";
import { MesureProvider } from "~/containers/MesureContext";
import { ServiceMesureSidebar } from "~/containers/ServiceMesureSidebar";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { SkipToContent } from "~/components";

function CloseMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <SkipToContent skipTo="close_mesure_wrapper" />
      <MesureProvider mesureId={mesureId}>
        <LayoutServices>
          <BoxWrapper mt={1} id="close_mesure_wrapper">
            <Flex flexDirection="column">
              <ServiceMesureSidebar mesureId={mesureId} />
              <MesureClose />
            </Flex>
          </BoxWrapper>
        </LayoutServices>
      </MesureProvider>
    </>
  );
}

export default CloseMesurePage;
