import { EditPassword } from "~/containers/EditPassword";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutMagistrat } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
        <EditPassword mt="3" />
      </BoxWrapper>
    </LayoutMagistrat>
  );
}

export default EditInformations;
