import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireMesureSidebar } from "~/components/MandataireMesureSidebar";
import { MesureAccept } from "~/components/MesureAccept";
import { MesureProvider } from "~/components/MesureContext";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const AcceptMesurePage = () => {
  const { mesure_id: mesureId } = useQuery();
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
