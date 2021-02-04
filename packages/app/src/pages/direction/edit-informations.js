import { useContext } from "react";

import { DirectionEditInformations } from "~/containers/DirectionEditInformations";
import { LayoutDirection } from "~/containers/Layout";
import { UserContext } from "~/containers/UserContext";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  const redirectLink = "/direction/informations";
  const { id: userId } = useContext(UserContext);
  return (
    <LayoutDirection>
      <BoxWrapper mt={6} px="1">
        <DirectionEditInformations
          successLink={redirectLink}
          cancelLink={redirectLink}
          userId={userId}
          mt="3"
        />
      </BoxWrapper>
    </LayoutDirection>
  );
}

export default EditInformations;
