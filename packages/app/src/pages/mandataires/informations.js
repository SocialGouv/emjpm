import { Helmet } from "react-helmet";

import { LayoutMandataire } from "~/containers/Layout";
import { MandataireInformations } from "~/containers/MandataireInformations";
import { Card } from "~/components";
import { BoxWrapper } from "~/components/Grid";

const Informations = () => (
  <>
    <Helmet>
      <title>Vos informations | e-MJPM </title>
    </Helmet>
    <LayoutMandataire>
      <BoxWrapper mt={3} px="1">
        <Card p="5">
          <MandataireInformations />
        </Card>
      </BoxWrapper>
    </LayoutMandataire>
  </>
);

export default Informations;
