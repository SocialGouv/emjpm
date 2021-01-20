import { useContext } from "react";

import { AdminEditInformations } from "~/components/AdminEditInformations";
import { LayoutAdmin } from "~/components/Layout";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

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
