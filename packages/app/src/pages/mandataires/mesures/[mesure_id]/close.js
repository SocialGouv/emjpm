import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireMesureSidebar } from "~/containers/MandataireMesureSidebar";
import { MesureClose } from "~/containers/MesureClose";
import { MesureProvider } from "~/containers/MesureContext";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { SkipToContent } from "~/components";

function CloseMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <Helmet>
        <title>Mettre fin au mandat | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="mesure_close" />
      <MesureProvider mesureId={mesureId}>
        <LayoutMandataire>
          <BoxWrapper mt={1}>
            <Flex flexDirection="column" id="mesure_close">
              <MandataireMesureSidebar mesureId={mesureId} />
              <MesureClose />
            </Flex>
          </BoxWrapper>
        </LayoutMandataire>
      </MesureProvider>
    </>
  );
}

export default CloseMesurePage;
