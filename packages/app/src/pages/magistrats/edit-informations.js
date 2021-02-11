import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratEditInformations } from "~/containers/MagistratEditInformations";
import useUser from "~/hooks/useUser";
import { PATH } from "~/constants/basePath";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  const { id: userId, type } = useUser();
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
