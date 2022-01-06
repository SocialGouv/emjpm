import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratEditInformations } from "~/containers/MagistratEditInformations";
import useUser from "~/hooks/useUser";
import { PATH } from "~/constants/basePath";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";

function EditInformations() {
  const { id: userId, type } = useUser();
  const redirectLink = `${PATH[type]}/informations`;
  return (
    <>
      <Helmet>
        <title>Edition des informations de l'utilisateur | e-MJPM</title>
      </Helmet>
      <LayoutMagistrat>
        <BoxWrapper mt={3} px="1">
          <MagistratEditInformations
            userId={userId}
            cancelLink={redirectLink}
            successLink={redirectLink}
            mt="3"
          />
        </BoxWrapper>
      </LayoutMagistrat>
    </>
  );
}

export default EditInformations;
