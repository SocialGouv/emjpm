import { Flex } from "rebass";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireMesureSidebar } from "~/components/MandataireMesureSidebar";
import { MesureAccept } from "~/components/MesureAccept";
import { MesureProvider } from "~/components/MesureContext";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

const AcceptMesurePage = () => {
  const { mesure_id: mesureId } = useParams();
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutMandataire>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <MandataireMesureSidebar mesureId={mesureId} />
            <MesureAccept />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </MesureProvider>
  );
};

export default AcceptMesurePage;
