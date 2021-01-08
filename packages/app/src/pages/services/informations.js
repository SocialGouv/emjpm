import { Box, Card } from "rebass";

import { LayoutServices } from "~/components/Layout";
import { ServiceAntennes } from "~/components/ServiceAntennes";
import { ServiceInformations } from "~/components/ServiceInformations";
import { BoxWrapper } from "~/ui";

const Informations = () => {
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
};

export default Informations;
