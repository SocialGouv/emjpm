import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutMandataire } from "~/containers/Layout";
import { MesureCreate } from "~/containers/MesureCreate";
import { BoxWrapper } from "~/components/Grid";

function AddMesures() {
  return (
    <LayoutMandataire hasNavigation={false}>
      <BoxWrapper mt={3} px="1">
        <HeadingTitle mx="1">{"Création d'une mesure"}</HeadingTitle>
        <MesureCreate />
      </BoxWrapper>
    </LayoutMandataire>
  );
}

export default AddMesures;
