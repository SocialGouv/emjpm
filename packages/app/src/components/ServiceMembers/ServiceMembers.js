import { useMutation, useQuery } from "@apollo/react-hooks";
import { BoxWrapper, Card, Heading2, Text } from "@socialgouv/emjpm-ui-core";
import { formatDistanceToNow } from "date-fns";
import fr from "date-fns/locale/fr";
import React from "react";
import { Box, Flex } from "rebass";

import { DELETE_SERVICE_MEMBER } from "./mutations";
import { SERVICE_MEMBERS } from "./queries";
import { ServiceMemberInvitations } from "./ServiceMemberInvitations";

const ServiceMembers = props => {
  const { service } = props;

  const [deleteServiceMember] = useMutation(DELETE_SERVICE_MEMBER);

  const { loading, error, data } = useQuery(SERVICE_MEMBERS, {
    variables: { serviceId: service.id }
  });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "Error...";
  }

  const handleDelete = async id => {
    await deleteServiceMember({
      refetchQueries: ["ServiceMembers"],
      variables: { id }
    });
  };

  const { service_members } = data;

  return (
    <BoxWrapper mt={6} px={2}>
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
          <Text mb={4} fontWeight="bold">
            Liste des membres ({service_members.length})
          </Text>
          {service_members.map(member => (
            <Flex mb={1} key={member.user.email}>
              <Box sx={{ textOverflow: "ellipsis", overflow: "hidden" }} width={250}>
                {member.user.email}
              </Box>
              <Box color="textSecondary" width={250}>
                {`Inscrit il y a `}
                {member.user.created_at
                  ? formatDistanceToNow(new Date(member.user.created_at), { locale: fr })
                  : "N/C"}
              </Box>
              <Box width={100}>{member.is_admin ? "Admin" : "Membre"}</Box>
              <Box width={100}>{member.user.active ? "Actif" : "Inactif"}</Box>
              <Box
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={() => handleDelete(member.id)}
              >
                Supprimer
              </Box>
            </Flex>
          ))}
        </Card>
      </Box>
    </BoxWrapper>
  );
};

export { ServiceMembers };
