import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireMesureSidebar } from "~/containers/MandataireMesureSidebar";
import { MesureProvider } from "~/containers/MesureContext";
import { MesureView } from "~/containers/MesureView";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function MandataireMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <Helmet>
        <title>Mesure {mesure_id} | e-MJPM</title>
      </Helmet>
      <MesureProvider mesureId={mesureId}>
        <LayoutMandataire>
          <BoxWrapper mt={1}>
            <Flex flexDirection="column">
              <MandataireMesureSidebar mesureId={mesureId} />
              <MesureView />
            </Flex>
          </BoxWrapper>
        </LayoutMandataire>
      </MesureProvider>
    </>
  );
}

export default MandataireMesurePage;
