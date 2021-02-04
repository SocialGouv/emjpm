import { Box, Flex } from "rebass";

import { LinkButton } from "~/containers/Commons";
import { DirectionEnquetesList } from "~/containers/EnqueteDirection";
import { LayoutDirection } from "~/containers/Layout";
import { Heading } from "~/components";
import { BoxWrapper } from "~/components/Grid";

function DirectionEnquetesPage() {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <Flex mb={3} flexDirection="row" justifyContent="space-between">
          <Heading size={2}>Enquêtes</Heading>
          <Box>
            <LinkButton to="/direction/enquetes/create">
              Ajouter une enquête
            </LinkButton>
          </Box>
        </Flex>
        <DirectionEnquetesList />
      </BoxWrapper>
    </LayoutDirection>
  );
}

export default DirectionEnquetesPage;
