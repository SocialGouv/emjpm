import { BoxWrapper, Heading1, Card, Text, Heading3, Button } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";
import { Flex, Box } from "rebass";

import { withAuthSync } from "../../src/util/auth";
import { LayoutServices } from "../../src/components-v2/Layout";
import { ServiceMesures } from "../../src/components-v2/ServiceMesures";
import { ServicesFilters } from "../../src/components-v2/ServicesFilters";
import { FiltersContextProvider } from "../../src/components-v2/ServicesFilters/context";
import { UserInformations } from "../../src/components-v2/UserInformations";

const cardStyle = isHidden => {
  return {
    display: isHidden ? "none" : "block"
  };
};

const Mesures = () => {
  const [isHidden, togglePanel] = useState(false);
  return (
    <FiltersContextProvider>
      <LayoutServices>
        <BoxWrapper mt={6} px="1">
          <Card sx={cardStyle(isHidden)} mb="5">
            <Heading3 mb="2">{`Emjpm s'améliore`}</Heading3>
            <Text mb="1" lineHeight="1.5">
              {`Nous vous proposons une nouvelle version de notre plateforme e-MJPM. Cette nouvelle
            formule vous propose une nouvelle ergonomie ainsi que plusieurs nouvelles
            fonctionnalités issues directement de vos retours.`}
            </Text>
            <Text mb="1" lineHeight="1.5">
              {`La version du profil Service à venir dans les prochains jours vous permettra de créer des subdivisions (par exemple pour vos antennes) et d'y administrer des mesures.`}
            </Text>
            <Text mb="1" lineHeight="1.5">
              {`Courant octobre nous vous proposerons une fonctionnalité permettant d'attribuer des administrateurs pour chaque subdivision, l'import excel revue ainsi qu'une visualisation des mesures géolocalisées`}
            </Text>
            <Flex flexDirection="row" justifyContent="flex-end">
              <Box>
                <Button
                  variant="outline"
                  onClick={() => togglePanel(true)}
                >{`J'ai compris`}</Button>
              </Box>
            </Flex>
          </Card>
          <Heading1>Toutes vos mesures</Heading1>
          <UserInformations Component={props => <ServicesFilters {...props} />} />
          <Flex
            sx={{
              mt: "2",
              flexWrap: "wrap"
            }}
          >
            {/* <Box
            sx={{
              flexGrow: 99999,
              flexBasis: 0,
              minWidth: 320
            }}
          > */}
            <UserInformations Component={props => <ServiceMesures {...props} />} />
            {/* </Box>
          <Box
            sx={{
              flexGrow: 1,
              flexBasis: 256
            }}
          >
            map and other stuff
          </Box> */}
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
