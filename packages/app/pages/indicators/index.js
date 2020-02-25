import { BoxWrapper, Heading1 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { IndicatorList } from "../../src/components/IndicatorList";
import { LayoutPublic } from "../../src/components/Layout";
import { withAuthSync } from "../../src/util/auth";

const IndicatorPage = () => {
  return (
    <LayoutPublic>
      <BoxWrapper>
        <Box>
          <Heading1 py="4">Indicateurs de suivit des inscrits à E-mjpm</Heading1>
          <IndicatorList />
        </Box>
      </BoxWrapper>
    </LayoutPublic>
  );
};

export default withAuthSync(IndicatorPage);
