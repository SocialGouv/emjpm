import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { ServiceCreateAntenne } from "~/containers/ServiceAntenneCreate";
import { BoxWrapper } from "~/components/Grid";

function AddAntennes() {
  return (
    <LayoutServices>
      <BoxWrapper mt={3}>
        <HeadingTitle mx="1">Créer une antenne pour votre service</HeadingTitle>
        <ServiceCreateAntenne />
      </BoxWrapper>
    </LayoutServices>
  );
}

export default AddAntennes;
