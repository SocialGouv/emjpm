import { LayoutGreffier } from "~/containers/Layout";
import { GreffierEditInformations } from "~/containers/GreffierEditInformations";
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
        <title>edition des informations del'utilisateur | e-MPJM</title>
      </Helmet>
      <LayoutGreffier>
        <BoxWrapper mt={3} px="1">
          <GreffierEditInformations
            userId={userId}
            cancelLink={redirectLink}
            successLink={redirectLink}
            mt="3"
          />
        </BoxWrapper>
      </LayoutGreffier>
    </>
  );
}

export default EditInformations;
