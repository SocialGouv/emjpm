import { Helmet } from "react-helmet";

import { EditPassword } from "~/containers/EditPassword";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  return (
    <>
      <Helmet>
        <title>Modifier votre mot de passe | E-mjpm</title>
      </Helmet>
      <LayoutServices>
        <BoxWrapper mt={3} px="1">
          <HeadingTitle>Modifier votre mot de passe</HeadingTitle>
          <EditPassword mt="3" />
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}

export default EditInformations;
