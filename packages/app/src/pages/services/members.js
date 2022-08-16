import { LayoutServices } from "~/containers/Layout";
import { ServiceMemberInvitationCreate } from "~/containers/ServiceMemberInvitationCreate";
import { ServiceMemberInvitations } from "~/containers/ServiceMemberInvitations";
import { ServiceMembers } from "~/containers/ServiceMembers";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";
import { SkipToContent } from "../../components";

function ServiceMembersPage() {
  const { service_members, id, service } = useUser();
  const currentService = service_members.find(
    (sm) => sm.service.id === service.id
  );
  const { is_admin } = currentService;

  return (
    <>
      <Helmet>
        <title>Membres du service et accès | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="services_members" />
      <LayoutServices>
        <BoxWrapper mt={3} px={2} id="services_members">
          <ServiceMembers service={service} userId={id} isAdmin={is_admin} />
          {is_admin && (
            <ServiceMemberInvitations service={service} isAdmin={is_admin} />
          )}
          {is_admin && (
            <ServiceMemberInvitationCreate
              service={service}
              isAdmin={is_admin}
            />
          )}
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}

export default ServiceMembersPage;
