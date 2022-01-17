import { Helmet } from "react-helmet";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { MesureCreate } from "~/containers/MesureCreate";
import { BoxWrapper } from "~/components/Grid";

function AddMesures() {
  return (
    <>
      <Helmet>
        <title>Création d'une mesure | e-MJPM</title>
      </Helmet>
      <LayoutServices hasNavigation={false}>
        <BoxWrapper mt={3} px="1">
          <HeadingTitle mx="1">{"Création d'une mesure"}</HeadingTitle>
          <MesureCreate />
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}

export default AddMesures;
