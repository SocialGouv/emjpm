import { BoxWrapper } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutServices } from "../../../../src/components/Layout";
import { MesureClose } from "../../../../src/components/MesureClose";
import { MesureProvider } from "../../../../src/components/MesureContext";
import { ServiceMesureSidebar } from "../../../../src/components/ServiceMesureSidebar";
import { withAuthSync } from "../../../../src/util/auth";

const CloseMesurePage = (props) => {
  const { mesureId } = props;
  return (
    <MesureProvider mesureId={mesureId}>
      <LayoutServices>
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
              <ServiceMesureSidebar mesureId={mesureId} />
            </Box>
            <Box
              sx={{
                flexBasis: 0,
                flexGrow: 99999,
                minWidth: 320,
                p: 1,
              }}
            >
              <MesureClose />
            </Box>
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </MesureProvider>
  );
};

CloseMesurePage.getInitialProps = async ({ query }) => {
  return { mesureId: query.mesure_id };
};

export default withAuthSync(CloseMesurePage);
