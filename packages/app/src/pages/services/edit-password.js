import { EditPassword } from "~/containers/EditPassword";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  return (
    <LayoutServices>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
        <EditPassword mt="3" />
      </BoxWrapper>
    </LayoutServices>
  );
}

export default EditInformations;
