import React from "react";
import { Flex } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { MesureClose } from "~/components/MesureClose";
import { MesureProvider } from "~/components/MesureContext";
import { ServiceMesureSidebar } from "~/components/ServiceMesureSidebar";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const CloseMesurePage = () => {
  const { mesure_id: mesureId } = useQuery();
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <ServiceMesureSidebar mesureId={mesureId} />
            <MesureClose />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </MesureProvider>
  );
};

export default CloseMesurePage;
