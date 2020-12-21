import React from "react";
import { Flex } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { MesureClose } from "~/components/MesureClose";
import { MesureProvider } from "~/components/MesureContext";
import { ServiceMesureSidebar } from "~/components/ServiceMesureSidebar";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const CloseMesurePage = (props) => {
  const { mesureId } = props;
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

CloseMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(CloseMesurePage);
