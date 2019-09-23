import { BoxWrapper, Heading1, Card, Text, Heading3, Button } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";
import { Flex, Box } from "rebass";

import { withAuthSync } from "../../src/util/auth";
import { LayoutMagistrat } from "../../src/components-v2/Layout";
import { MagistratMandatairesList } from "../../src/components-v2/MagistratMandatairesList";
import { UserInformations } from "../../src/components-v2/UserInformations";

const cardStyle = isHidden => {
  return {
    display: isHidden ? "none" : "block"
  };
};

const Mandataires = () => {
  const [isHidden, togglePanel] = useState(false);
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <Card sx={cardStyle(isHidden)} mb="5">
          <Heading3 mb="2">{`Emjpm s'améliore`}</Heading3>
          <Text mb="1" lineHeight="1.5">
            {`Nous vous proposons une nouvelle version de la plateforme e-MJPM. Cette refonte vous propose une ergonomie plus adaptée aux usages ainsi que plusieurs nouvelles fonctionnalités issues directement de vos retours.`}
          </Text>
          <Text mb="1" lineHeight="1.5">
            {`La version du profil Magistrats
            actuelle vous permet de réserver des mesures auprès des mandataires agréés sur votre
            tribunal d'instance.`}
          </Text>
          <Text mb="1" lineHeight="1.5">
            {`Les fonctionnalités de géolocalisation sont en cours d'amélioration et vous seront
            proposées dans quelques jours, début octobre. Vos retours sur ces améliorations sont les
            bienvenus`}
          </Text>
          <Flex flexDirection="row" justifyContent="flex-end">
            <Box>
              <Button variant="outline" onClick={() => togglePanel(true)}>{`J'ai compris`}</Button>
            </Box>
          </Flex>
        </Card>
        <Heading1>Tous les mandataires</Heading1>
        <Flex
          sx={{
            mt: "2",
            flexWrap: "wrap"
          }}
        >
          <UserInformations
            Component={props => {
              return <MagistratMandatairesList {...props} />;
            }}
          />
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default withAuthSync(Mandataires);
