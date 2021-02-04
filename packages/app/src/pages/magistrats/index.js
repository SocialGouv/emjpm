import { Flex } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratMandatairesList } from "~/containers/MagistratMandatairesList";
import { BoxWrapper } from "~/components/Grid";

function Mandataires() {
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle>Tous les mandataires</HeadingTitle>
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2",
          }}
        >
          <MagistratMandatairesList />
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
}

export default Mandataires;
