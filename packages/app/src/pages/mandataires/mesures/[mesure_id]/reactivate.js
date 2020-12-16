import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireMesureSidebar } from "~/components/MandataireMesureSidebar";
import { MesureProvider } from "~/components/MesureContext";
import { MesureReactivate } from "~/components/MesureReactivate";
import { withAuthSync } from "~/util/auth";

const ReactivateMesurePage = (props) => {
  const { mesureId } = props;
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

ReactivateMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(ReactivateMesurePage);
