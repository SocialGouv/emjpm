import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutMandataire } from "../../../../src/components/Layout";
import { MandataireMesureClose } from "../../../../src/components/MandataireMesureClose";
import { MandataireMesureSidebar } from "../../../../src/components/MandataireMesureSidebar";
import { MesureProvider } from "../../../../src/components/MesureContext";
import { withAuthSync } from "../../../../src/util/auth";

const CloseMesurePage = (props) => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutMandataire>
        <BoxWrapper mt={6} px="0">
          <Flex
            sx={{
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                flexBasis: 250,
                flexGrow: 1,
                p: 1,
              }}
            >
              <MandataireMesureSidebar mesureId={mesureId} />
            </Box>
            <Box
              sx={{
                flexBasis: 0,
                flexGrow: 99999,
                minWidth: 320,
                p: 1,
              }}
            >
              <MandataireMesureClose />
            </Box>
          </Flex>
        </BoxWrapper>
      </LayoutMandataire>
    </MesureProvider>
  );
};

CloseMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(CloseMesurePage);
