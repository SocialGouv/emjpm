import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutMandataire } from "~/containers/Layout";
import { MesureCreate } from "~/containers/MesureCreate";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function AddMesures() {
  return (
    <>
      <Helmet>
        <title>Création d'une mesure | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="mesure_create" />
      <LayoutMandataire hasNavigation={false}>
        <BoxWrapper mt={3} px="1">
          <HeadingTitle mx="1">{"Création d'une mesure"}</HeadingTitle>
          <MesureCreate />
        </BoxWrapper>
      </LayoutMandataire>
    </>
  );
}

export default AddMesures;
