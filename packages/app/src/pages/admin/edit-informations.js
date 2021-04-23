import { AdminEditInformations } from "~/containers/AdminEditInformations";
import { LayoutAdmin } from "~/containers/Layout";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  const redirectLink = "/admin/informations";
  const { id: userId } = useUser();
  return (
    <LayoutAdmin>
      <BoxWrapper mt={3} px="1">
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
