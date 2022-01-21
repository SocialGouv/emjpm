import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { AdminUserService } from "~/containers/AdminUserService";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";

export default function EditInformations() {
  const { id: userId } = useUser();
  return (
    <>
      <Helmet>
        <title>Editer les informations de votre service | e-MJPM</title>
      </Helmet>
      <LayoutServices>
        <BoxWrapper mt={3}>
          <HeadingTitle mx="1">
            Editer les informations de votre service
          </HeadingTitle>
          <AdminUserService
            mt="3"
            userId={userId}
            cancelLink="/services/informations"
            successLink="/services/informations"
          />
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}
