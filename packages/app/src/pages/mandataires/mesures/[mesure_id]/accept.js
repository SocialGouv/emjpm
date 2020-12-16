import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireMesureSidebar } from "~/components/MandataireMesureSidebar";
import { MesureAccept } from "~/components/MesureAccept";
import { MesureProvider } from "~/components/MesureContext";
import { withAuthSync } from "~/util/auth";

const AcceptMesurePage = (props) => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutMandataire>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <MandataireMesureSidebar mesureId={mesureId} />
            <MesureAccept />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </MesureProvider>
  );
};

AcceptMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(AcceptMesurePage);
