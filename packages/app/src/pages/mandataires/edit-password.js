import { EditPassword } from "~/components/EditPassword";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutMandataire } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

function EditInformations() {
  return (
    <LayoutMandataire>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
        <EditPassword mt="3" />
      </BoxWrapper>
    </LayoutMandataire>
  );
}

export default EditInformations;
