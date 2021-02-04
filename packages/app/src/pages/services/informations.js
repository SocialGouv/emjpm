import { Box, Card } from "rebass";

import { LayoutServices } from "~/containers/Layout";
import { ServiceAntennes } from "~/containers/ServiceAntennes";
import { ServiceInformations } from "~/containers/ServiceInformations";
import { BoxWrapper } from "~/components/Grid";

function Informations() {
  return (
    <LayoutServices>
      <BoxWrapper m={2} px="1">
        <Card p="5" m={2}>
          <ServiceInformations mt="3" />
        </Card>
        <Box m={2}>
          <ServiceAntennes />
        </Box>
      </BoxWrapper>
    </LayoutServices>
  );
}

export default Informations;
