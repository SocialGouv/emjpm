import { EditPassword } from "~/containers/EditPassword";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutAdmin } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  return (
    <LayoutAdmin>
      <BoxWrapper mt={3} px="1">
        <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
        <EditPassword mt="3" />
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default EditInformations;
