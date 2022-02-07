import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { MesureCreate } from "~/containers/MesureCreate";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function AddMesures() {
  return (
    <>
      <Helmet>
        <title>Création d'une mesure | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="add_mesure_wrapper" />

      <LayoutServices hasNavigation={false}>
        <BoxWrapper mt={3} px="1" id="add_mesure_wrapper">
          <HeadingTitle mx="1">{"Création d'une mesure"}</HeadingTitle>
          <MesureCreate />
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}

export default AddMesures;
