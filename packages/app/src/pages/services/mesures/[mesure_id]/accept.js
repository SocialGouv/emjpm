import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { MesureAccept } from "~/components/MesureAccept";
import { MesureProvider } from "~/components/MesureContext";
import { ServiceMesureSidebar } from "~/components/ServiceMesureSidebar";
import { withAuthSync } from "~/util/auth";

const AcceptMesurePage = (props) => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <ServiceMesureSidebar mesureId={mesureId} />
            <MesureAccept />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </MesureProvider>
  );
};

AcceptMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(AcceptMesurePage);
