import { useContext } from "react";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratEditInformations } from "~/components/MagistratEditInformations";
import { UserContext } from "~/components/UserContext";
import { PATH } from "~/constants/basePath";
import { BoxWrapper } from "~/ui";

function EditInformations() {
  const { id: userId, type } = useContext(UserContext);
  const redirectLink = `${PATH[type]}/informations`;
  return (
    <LayoutMagistrat>
      <BoxWrapper mt={6} px="1">
        <MagistratEditInformations
          userId={userId}
          cancelLink={redirectLink}
          successLink={redirectLink}
          mt="3"
        />
      </BoxWrapper>
    </LayoutMagistrat>
  );
}

export default EditInformations;
