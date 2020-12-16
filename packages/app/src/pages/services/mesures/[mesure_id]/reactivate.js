import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { MesureProvider } from "~/components/MesureContext";
import { MesureReactivate } from "~/components/MesureReactivate";
import { ServiceMesureSidebar } from "~/components/ServiceMesureSidebar";
import { withAuthSync } from "~/util/auth";

const ReactivateMesurePage = (props) => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <ServiceMesureSidebar mesureId={mesureId} />
            <MesureReactivate />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </MesureProvider>
  );
};

ReactivateMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(ReactivateMesurePage);
