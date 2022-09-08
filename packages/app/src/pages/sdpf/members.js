import { LayoutSdpf } from "~/containers/Layout";
import { ServiceMemberInvitationCreate } from "~/containers/ServiceMemberInvitationCreate";
import { SdpfMemberInvitations } from "~/containers/SdpfMemberInvitations";
import { SdpfMembers } from "~/containers/SdpfMembers";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";
import { SkipToContent } from "../../components";

function SdpfMembersPage() {
  const { sdpf_members: service_members, id } = useUser();
  const [{ is_admin, sdpf: service }] = service_members;

  return (
    <>
      <Helmet>
        <title>Membres du service et accès | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="services_members" />
      <LayoutSdpf>
        <BoxWrapper mt={3} px={2} id="services_members">
          <SdpfMembers service={service} userId={id} isAdmin={is_admin} />

          {is_admin && (
            <SdpfMemberInvitations service={service} isAdmin={is_admin} />
          )}

          {is_admin && (
            <ServiceMemberInvitationCreate
              service={service}
              isAdmin={is_admin}
            />
          )}
        </BoxWrapper>
      </LayoutSdpf>
    </>
  );
}

export default SdpfMembersPage;
