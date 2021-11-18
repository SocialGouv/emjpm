import { Flex } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutGreffier } from "~/containers/Layout";
import { GreffierMandatairesList } from "~/containers/GreffierMandatairesList";
import { BoxWrapper } from "~/components/Grid";

function Mandataires() {
  return (
    <LayoutGreffier>
      <BoxWrapper mt={3} px="1">
        <HeadingTitle>Tous les mandataires</HeadingTitle>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2",
          }}
        >
          <GreffierMandatairesList />
        </Flex>
      </BoxWrapper>
    </LayoutGreffier>
  );
}

export default Mandataires;
