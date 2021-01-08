import { EditPassword } from "~/components/EditPassword";
import { HeadingTitle } from "~/components/HeadingTitle";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

const EditInformations = () => {
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
        <EditPassword mt="3" />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default EditInformations;
