import { BoxWrapper, Heading2 } from "@socialgouv/emjpm-ui-core";
import { useRouter } from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { LayoutServices } from "../../../src/components-v2/Layout";
import { PreferencesPanel } from "../../../src/components-v2/PreferencesPanel";
import { ServicesInformations } from "../../../src/components-v2/ServicesInformations";
import { withAuthSync } from "../../../src/util/auth";

const Antennes = () => {
  const router = useRouter();
  const { antenne_id } = router.query;
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="1">
        <Flex
          sx={{
            flexWrap: "wrap"
          }}
        >
          <Box
            sx={{
              flexBasis: 0,
              flexGrow: 99999,
              minWidth: 320,
              p: 1
            }}
          >
            <Heading2>Informations générales</Heading2>
            <ServicesInformations currentAntenne={antenne_id} mt="3" />
          </Box>
          <Box
            sx={{
              flexBasis: 320,
              flexGrow: 1,
              p: 1
            }}
          >
            <Heading2>Mesures souhaitées</Heading2>
            <PreferencesPanel currentAntenne={antenne_id} mt="3" />
          </Box>
        </Flex>
      </BoxWrapper>
    </LayoutServices>
  );
};

export default withAuthSync(Antennes);
