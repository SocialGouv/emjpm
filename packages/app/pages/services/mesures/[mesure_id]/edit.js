import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutServices } from "../../../../src/components/Layout";
import { MesureProvider } from "../../../../src/components/MesureContext";
import { MesureCreateOrEdit } from "../../../../src/components/MesureCreateOrEdit";
import { ServiceMesureSidebar } from "../../../../src/components/ServiceMesureSidebar";
import { withAuthSync } from "../../../../src/util/auth";

const EditMesurePage = (props) => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <ServiceMesureSidebar mesureId={mesureId} />
            <MesureCreateOrEdit />
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
