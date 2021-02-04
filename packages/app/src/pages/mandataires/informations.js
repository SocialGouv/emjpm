import { LayoutMandataire } from "~/containers/Layout";
import { MandataireInformations } from "~/containers/MandataireInformations";
import { Card } from "~/components";
import { BoxWrapper } from "~/components/Grid";

const Informations = () => (
  <LayoutMandataire>
    <BoxWrapper mt={6} px="1">
      <Card p="5">
        <MandataireInformations />
      </Card>
    </BoxWrapper>
  </LayoutMandataire>
);

export default Informations;
