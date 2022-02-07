import { Flex } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { MesureAccept } from "~/containers/MesureAccept";
import { MesureProvider } from "~/containers/MesureContext";
import { ServiceMesureSidebar } from "~/containers/ServiceMesureSidebar";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { SkipToContent } from "~/components";

function AcceptMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <SkipToContent skipTo="accept_mesure_wrapper" />
      <MesureProvider mesureId={mesureId}>
        <LayoutServices>
          <BoxWrapper mt={1} id="accept_mesure_wrapper">
            <Flex flexDirection="column">
              <ServiceMesureSidebar mesureId={mesureId} />
              <MesureAccept />
            </Flex>
          </BoxWrapper>
        </LayoutServices>
      </MesureProvider>
    </>
  );
}

export default AcceptMesurePage;
