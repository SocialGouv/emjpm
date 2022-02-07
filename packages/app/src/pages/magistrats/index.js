import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratMandatairesList } from "~/containers/MagistratMandatairesList";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function Mandataires() {
  return (
    <>
      <Helmet>
        <title>Tous les mandataires | e-MJPM </title>
      </Helmet>
      <SkipToContent skipTo="magistrats_mandataires_filter" />
      <LayoutMagistrat>
        <BoxWrapper mt={3} px="1">
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
    </>
  );
}

export default Mandataires;
