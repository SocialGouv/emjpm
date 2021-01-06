import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireMesureSidebar } from "~/components/MandataireMesureSidebar";
import { MesureProvider } from "~/components/MesureContext";
import { MesureReactivate } from "~/components/MesureReactivate";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const ReactivateMesurePage = () => {
  const { mesure_id: mesureId } = useQuery();
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutMandataire>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <MandataireMesureSidebar mesureId={mesureId} />
            <MesureReactivate />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </MesureProvider>
  );
};

export default ReactivateMesurePage;
