import { Helmet } from "react-helmet";

import { LayoutDpfi } from "~/containers/Layout";
import { DpfiInformations } from "~/containers/DpfiInformations";
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
        <Card p="5">
          <DpfiInformations />
        </Card>
      </BoxWrapper>
    </LayoutDpfi>
  </>
);

export default Informations;
