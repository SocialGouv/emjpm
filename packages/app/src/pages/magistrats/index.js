import { Flex } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutMagistrat } from "~/components/Layout";
import { MagistratMandatairesList } from "~/components/MagistratMandatairesList";
import { BoxWrapper } from "~/ui";

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
