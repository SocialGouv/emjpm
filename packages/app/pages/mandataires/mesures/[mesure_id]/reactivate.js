import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMandataire } from "../../../../src/components/Layout";
import { MandataireMesureReactivate } from "../../../../src/components/MandataireMesureReactivate";
import { MandataireMesureSidebar } from "../../../../src/components/MandataireMesureSidebar";
import { MesureProvider } from "../../../../src/components/MesureContext";
import { withAuthSync } from "../../../../src/util/auth";

const ReactivateMesurePage = props => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutMandataire>
        <BoxWrapper mt={6} px="0">
          <Flex
            sx={{
              flexWrap: "wrap"
            }}
          >
            <Box
              sx={{
                flexBasis: 250,
                flexGrow: 1,
                p: 1
              }}
            >
              <MandataireMesureSidebar mesureId={mesureId} />
            </Box>
            <Box
              sx={{
                flexBasis: 0,
                flexGrow: 99999,
                minWidth: 320,
                p: 1
              }}
            >
              <MandataireMesureReactivate />
            </Box>
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
