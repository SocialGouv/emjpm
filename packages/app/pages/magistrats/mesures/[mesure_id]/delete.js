import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMagistrat } from "../../../../src/components/Layout";
import { MagistratMesureDelete } from "../../../../src/components/MagistratMesureDelete";
import { MesureProvider } from "../../../../src/components/MesureContext";
import { withAuthSync } from "../../../../src/util/auth";

const MagistratMesureDeletePage = (props) => {
  const { mesureId } = props;

  return (
    <LayoutMagistrat>
      <BoxWrapper mt="6" px="1">
        <Flex flexWrap="wrap" mt="2">
          <MesureProvider mesureId={mesureId}>
            <MagistratMesureDelete />
          </MesureProvider>
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

MagistratMesureDeletePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(MagistratMesureDeletePage);
