import { EditPassword } from "~/components/EditPassword";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutMagistrat } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

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
