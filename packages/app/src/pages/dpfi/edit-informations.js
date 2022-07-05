import { Helmet } from "react-helmet";
import { DpfiEditInformations } from "~/containers/DpfiEditInformations";
import { LayoutDpfi } from "~/containers/Layout";
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
          <DpfiEditInformations />
        </Card>
      </BoxWrapper>
    </LayoutDpfi>
  </>
);

export default Informations;
