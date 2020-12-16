import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMandataire } from "~/components/Layout";
import { MandataireMesureSidebar } from "~/components/MandataireMesureSidebar";
import { MesureProvider } from "~/components/MesureContext";
import { MesureDelete } from "~/components/MesureDelete";
import { withAuthSync } from "~/util/auth";

const DeleteMesurePage = (props) => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutMandataire>
        <BoxWrapper mt={1}>
          <Flex flexDirection="column">
            <MandataireMesureSidebar mesureId={mesureId} />
            <MesureDelete />
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </MesureProvider>
  );
};

DeleteMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(DeleteMesurePage);
