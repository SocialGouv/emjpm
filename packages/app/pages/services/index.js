import { Button, BoxWrapper, Card, Heading1, Heading3, Text } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";
import { Box, Flex } from "rebass";
import { LinkButton } from "../../src/components-v2/Commons";
import { LayoutServices } from "../../src/components-v2/Layout";
import { ServiceMesures } from "../../src/components-v2/ServiceMesures";
import { ServicesFilters } from "../../src/components-v2/ServicesFilters";
import { FiltersContextProvider } from "../../src/components-v2/ServicesFilters/context";
import { UserInformations } from "../../src/components-v2/UserInformations";
import { withAuthSync } from "../../src/util/auth";

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
              {`Nous vous proposons une nouvelle version de la plateforme e-MJPM. Cette refonte  vous propose une ergonomie plus adaptée aux usages ainsi que plusieurs nouvelles fonctionnalités issues directement de vos retours.`}
            </Text>
            <Text mb="1" lineHeight="1.5">
              {`La version du profil Service à venir dans les prochains jours vous permettra de créer des subdivisions (par exemple pour vos antennes) et d'y administrer des mesures.`}
            </Text>
            <Text mb="1" lineHeight="1.5">
              {`Courant octobre, nous vous proposerons des fonctionnalités complémentaires comme : attribuer des  administrateurs à chaque subdivisions ; la possibilité d'importer de manière fluide ses mesures en cours via un tableau Excel ; ainsi qu'une visualisation géolocalisée des mesures `}
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
          <Flex flexDirection="row" justifyContent="space-between">
            <Heading1>Toutes vos mesures</Heading1>
            <Box>
              <LinkButton href="/services/add-mesures">Ajouter une mesure</LinkButton>
            </Box>
          </Flex>

          <UserInformations Component={props => <ServicesFilters {...props} />} />
          <Flex
            sx={{
              mt: "2",
              flexWrap: "wrap"
            }}
          >
            <UserInformations Component={props => <ServiceMesures {...props} />} />
          </Flex>
        </BoxWrapper>
      </LayoutServices>
    </FiltersContextProvider>
  );
};

export default withAuthSync(Mesures);
