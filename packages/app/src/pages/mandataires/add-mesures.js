import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutMandataire } from "~/components/Layout";
import { MesureCreate } from "~/components/MesureCreate";
import { BoxWrapper } from "~/ui";

const AddMesures = () => {
  return (
    <LayoutMandataire hasNavigation={false}>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle mx="1">{"Création d'une mesure"}</HeadingTitle>
        <MesureCreate />
      </BoxWrapper>
    </LayoutMandataire>
  );
};

export default AddMesures;
