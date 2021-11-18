import { EditPassword } from "~/containers/EditPassword";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutGreffier } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  return (
    <LayoutGreffier>
      <BoxWrapper mt={3} px="1">
        <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
        <EditPassword mt="3" />
      </BoxWrapper>
    </LayoutGreffier>
  );
}

export default EditInformations;
