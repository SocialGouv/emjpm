import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { MesureProvider } from "~/components/MesureContext";
import { MesureView } from "~/components/MesureView";
import { ServiceMesureSidebar } from "~/components/ServiceMesureSidebar";
import { withAuthSync } from "~/util/auth";

const ServiceMesurePage = (props) => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <ServiceMesureSidebar mesureId={mesureId} />
            <MesureView />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </MesureProvider>
  );
};

ServiceMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(ServiceMesurePage);
