import React from "react";
import { Flex } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { MesureProvider } from "~/components/MesureContext";
import { MesureEdit } from "~/components/MesureEdit";
import { ServiceMesureSidebar } from "~/components/ServiceMesureSidebar";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const EditMesurePage = (props) => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <ServiceMesureSidebar mesureId={mesureId} />
            <MesureEdit />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </MesureProvider>
  );
};

EditMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(EditMesurePage);
