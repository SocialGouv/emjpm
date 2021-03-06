import { DirectionEditInformations } from "~/containers/DirectionEditInformations";
import { LayoutDirection } from "~/containers/Layout";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  const redirectLink = "/direction/informations";
  const { id: userId } = useUser();
  return (
    <LayoutDirection>
      <BoxWrapper mt={3} px="1">
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
