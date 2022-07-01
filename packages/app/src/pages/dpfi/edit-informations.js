import { Helmet } from "react-helmet";

import { LayoutDpfi } from "~/containers/Layout";
import { MandataireInformations } from "~/containers/MandataireInformations";
import { Card, SkipToContent } from "~/components";
import { BoxWrapper } from "~/components/Grid";

const Informations = () => (
  <>
    <Helmet>
      <title>Vos informations | e-MJPM </title>
    </Helmet>
    <SkipToContent skipTo="mandataire_informations" />

    <LayoutDpfi>
      <BoxWrapper mt={3} px="1">
        <Card p="5">{/* <MandataireInformations /> */}</Card>
      </BoxWrapper>
    </LayoutDpfi>
  </>
);

export default Informations;
