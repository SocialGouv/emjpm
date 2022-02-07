import { Helmet } from "react-helmet";

import { EditPassword } from "~/containers/EditPassword";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutMandataire } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "../../components";

function EditInformations() {
  return (
    <>
      <Helmet>
        <title>Modifier votre mot de passe | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="modifier_mot_de_passe" />
      <LayoutMandataire>
        <BoxWrapper mt={3} px="1">
          <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
          <EditPassword mt="3" />
        </BoxWrapper>
      </LayoutMandataire>
    </>
  );
}

export default EditInformations;
