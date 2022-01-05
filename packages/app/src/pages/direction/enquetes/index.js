import { Box, Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LinkButton } from "~/containers/Commons";
import { DirectionEnquetesList } from "~/containers/EnqueteDirection";
import { LayoutDirection } from "~/containers/Layout";
import { Heading } from "~/components";
import { BoxWrapper } from "~/components/Grid";
import useUser from "~/hooks/useUser";
import { isDirectionNationale } from "@emjpm/biz";

function DirectionEnquetesPage() {
  const user = useUser();
  return (
    <>
      <Helmet>
        <title>Enquêtes | e-MPJM</title>
      </Helmet>
      <LayoutDirection>
        <BoxWrapper mt={3} px="1">
          <Flex mb={3} flexDirection="row" justifyContent="space-between">
            <Heading size={2}>Enquêtes</Heading>
            {isDirectionNationale(user) && (
              <Box>
                <LinkButton to="/direction/enquetes/create">
                  Ajouter une enquête
                </LinkButton>
              </Box>
            )}
          </Flex>
          <DirectionEnquetesList />
        </BoxWrapper>
      </LayoutDirection>
    </>
  );
}

export default DirectionEnquetesPage;
