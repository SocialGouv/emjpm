import { Helmet } from "react-helmet";

import { EditPassword } from "~/containers/EditPassword";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutMagistrat } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function EditInformations() {
  return (
    <>
      <Helmet>
        <title>Modifier votre mot de passe</title>
      </Helmet>
      <SkipToContent skipTo="modifier_mot_de_passe" />
      <LayoutMagistrat>
        <BoxWrapper mt={3} px="1">
          <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
          <EditPassword mt="3" />
        </BoxWrapper>
      </LayoutMagistrat>
    </>
  );
}

export default EditInformations;
