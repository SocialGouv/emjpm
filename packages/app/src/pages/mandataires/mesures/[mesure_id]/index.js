import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireMesureSidebar } from "~/components/MandataireMesureSidebar";
import { MesureProvider } from "~/components/MesureContext";
import { MesureView } from "~/components/MesureView";
import { BoxWrapper } from "~/ui";
import { withAuthSync } from "~/util/auth";

const MandataireMesurePage = (props) => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutMandataire>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <MandataireMesureSidebar mesureId={mesureId} />
            <MesureView />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </MesureProvider>
  );
};

MandataireMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(MandataireMesurePage);
