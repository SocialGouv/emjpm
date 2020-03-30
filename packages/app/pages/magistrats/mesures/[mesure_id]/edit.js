import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Flex } from "rebass";

import { LayoutMagistrat } from "../../../../src/components/Layout";
import { MagistratMesureEdit } from "../../../../src/components/MagistratMesureEdit";
import { MesureProvider } from "../../../../src/components/MesureContext";
import { withAuthSync } from "../../../../src/util/auth";

const MagistratMesureEditPage = props => {
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
            <MagistratMesureEdit />
          </MesureProvider>
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

MagistratMesureEditPage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(MagistratMesureEditPage);
