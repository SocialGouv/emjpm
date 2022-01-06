import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireMesureSidebar } from "~/containers/MandataireMesureSidebar";
import { MesureClose } from "~/containers/MesureClose";
import { MesureProvider } from "~/containers/MesureContext";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function CloseMesurePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <Helmet>
        <title>Mettre fin au mandat | e-MJPM</title>
      </Helmet>
      <MesureProvider mesureId={mesureId}>
        <LayoutMandataire>
          <BoxWrapper mt={1}>
            <Flex flexDirection="column">
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
