import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutSdpf } from "~/containers/Layout";
import { AdminUserSdpf } from "~/containers/AdminUserSdpf";
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
      <LayoutSdpf>
        <BoxWrapper mt={3} id="edit_informations">
          <HeadingTitle mb={3}>
            Editer les informations de votre service
          </HeadingTitle>
          <AdminUserSdpf
            mt="3"
            userId={userId}
            cancelLink="/sdpf/informations"
            successLink="/sdpf/informations"
          />
        </BoxWrapper>
      </LayoutSdpf>
    </>
  );
}
