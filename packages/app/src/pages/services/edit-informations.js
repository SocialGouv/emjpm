import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { AdminUserService } from "~/containers/AdminUserService";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";
import { SkipToContent } from "~/components";

export default function EditInformations() {
  const { id: userId } = useUser();
  return (
    <>
      <Helmet>
        <title>Editer les informations de votre service | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="edit_informations" />
      <LayoutServices>
        <BoxWrapper mt={3} id="edit_informations">
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
