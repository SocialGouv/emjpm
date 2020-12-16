import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratMesure } from "~/components/MagistratMesure";
import { MagistratMesureMandataire } from "~/components/MagistratMesureMandataire";
import { MesureProvider } from "~/components/MesureContext";
import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { withAuthSync } from "~/util/auth";

const Mandataires = (props) => {
  const { mesureId } = props;
  return (
    <LayoutMagistrat initialValues={{ natureMesure: DEFAULT_MESURE_NATURE }}>
      <BoxWrapper mt={6} px="1">
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2",
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
