import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { ServiceCreateAntenne } from "~/containers/ServiceAntenneCreate";
import { BoxWrapper } from "~/components/Grid";

function AddAntennes() {
  return (
    <>
      <Helmet>
        <title>Créer une antenne pour votre service | e-MJPM</title>
      </Helmet>
      <LayoutServices>
        <BoxWrapper mt={3}>
          <HeadingTitle mx="1">
            Créer une antenne pour votre service
          </HeadingTitle>
          <ServiceCreateAntenne />
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}

export default AddAntennes;
