import { BoxWrapper } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Flex } from "rebass";

import { LayoutMagistrat } from "../../../src/components/Layout";
import { MagistratMesure } from "../../../src/components/MagistratMesure";
import { MagistratMesureMandataire } from "../../../src/components/MagistratMesureMandataire";
import { MesureProvider } from "../../../src/components/MesureContext";
import { withAuthSync } from "../../../src/util/auth";

const Mandataires = props => {
  const { mesureId } = props;
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2"
          }}
        >
          <MesureProvider mesureId={mesureId}>
            <MagistratMesure />
            <MagistratMesureMandataire />
          </MesureProvider>
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

Mandataires.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(Mandataires);
