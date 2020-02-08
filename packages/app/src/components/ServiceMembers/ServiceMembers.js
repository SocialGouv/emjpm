import { useQuery } from "@apollo/react-hooks";
import { BoxWrapper, Card, Heading2 } from "@socialgouv/emjpm-ui-core";
import { formatDistanceToNow } from "date-fns";
import fr from "date-fns/locale/fr";
import React from "react";
import { Box, Flex } from "rebass";

import { SERVICE_MEMBERS } from "./queries";
import { ServiceMemberInvitations } from "./ServiceMemberInvitations";

const ServiceMembers = props => {
  const { service } = props;

  const { loading, error, data } = useQuery(SERVICE_MEMBERS, {
    variables: { serviceId: service.id }
  });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "Error...";
  }

  const { service_members } = data;

  return (
    <BoxWrapper mt={6} px="0">
      <Box mb={4}>
        <Heading2 width={[1]} mb="2">
          Invitations
        </Heading2>
        <Card width={[1]} p={4} mb={4}>
          <ServiceMemberInvitations service={service} />
        </Card>
      </Box>
      <Box mb={4}>
        <Heading2 width={[1]} mb="2">
          Membres
        </Heading2>
        <Card p={4} width={[1]}>
          {service_members.map(member => (
            <Flex mb={2} key={member.user.email}>
              <Box width={250}>{member.user.email}</Box>
              <Box color="textSecondary" width={300}>
                {`Inscrit il y a `}
                {member.user.created_at
                  ? formatDistanceToNow(new Date(member.user.created_at), { locale: fr })
                  : "N/C"}
              </Box>
              <Box width={100}>{member.is_admin ? "Admin" : "Membre"}</Box>
            </Flex>
          ))}
        </Card>
      </Box>
    </BoxWrapper>
  );
};

export { ServiceMembers };
