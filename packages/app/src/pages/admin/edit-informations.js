import { useContext } from "react";

import { AdminEditInformations } from "~/containers/AdminEditInformations";
import { LayoutAdmin } from "~/containers/Layout";
import { UserContext } from "~/containers/UserContext";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  const redirectLink = "/admin/informations";
  const { id: userId } = useContext(UserContext);
  return (
    <LayoutAdmin>
      <BoxWrapper mt={6} px="1">
        <AdminEditInformations
          successLink={redirectLink}
          cancelLink={redirectLink}
          userId={userId}
          mt="3"
        />
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default EditInformations;
