import { useMutation, useQuery } from "@apollo/react-hooks";
import { BoxWrapper, Card, Heading2, Select, Text } from "@socialgouv/emjpm-ui-core";
import { format } from "date-fns";
import React from "react";
import { Box, Flex } from "rebass";
import { Trash } from "styled-icons/boxicons-regular";

import { DELETE_SERVICE_MEMBER, UPDATE_SERVICE_MEMBER_IS_ADMIN } from "./mutations";
import { SERVICE_MEMBERS } from "./queries";
import { ServiceMemberInvitations } from "./ServiceMemberInvitations";

const ServiceMembers = props => {
  const { service } = props;

  const [deleteServiceMember] = useMutation(DELETE_SERVICE_MEMBER);
  const [updateServiceMemberIsAdmin] = useMutation(UPDATE_SERVICE_MEMBER_IS_ADMIN);

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

  const handleIsAdminUpdate = async (id, isAdmin) => {
    updateServiceMemberIsAdmin({
      refetchQueries: ["ServiceMembers"],
      variables: {
        id,
        is_admin: isAdmin
      }
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
          {service_members.map((member, i) => (
            <Flex
              bg={i % 2 ? "" : "muted"}
              p={2}
              mb={1}
              sx={{
                borderRadius: 4,
                alignItems: "center"
              }}
              key={member.user.email}
            >
              <Box color="textSecondary" width={50}>
                {member.id}.
              </Box>
              <Box sx={{ textOverflow: "ellipsis", overflow: "hidden" }} width={250}>
                {member.user.email}
              </Box>
              <Text color="textSecondary" width={200}>
                {`Inscrit le `}
                {format(new Date(member.user.created_at), "dd/MM/yyyy")}
              </Text>
              <Box width={200} mr={4}>
                <Select
                  id="urgent"
                  name="urgent"
                  width={200}
                  placeholder="Est-ce une demande urgente"
                  value={
                    member.is_admin
                      ? { label: "Administrateur", value: true }
                      : { label: "Membre", value: false }
                  }
                  hasError={false}
                  onChange={({ value }) => handleIsAdminUpdate(member.id, value)}
                  options={[
                    { label: "Administrateur", value: true },
                    { label: "Membre", value: false }
                  ]}
                />
              </Box>
              <Box color="textSecondary" width={200}>
                {member.user.active ? "Activé" : "En attente de d'activation"}
              </Box>
              <Box sx={{ flexGrow: 1, textAlign: "right" }}>
                <Box
                  mx={2}
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash title="Supprimer" size="22" />
                </Box>
              </Box>
            </Flex>
          ))}
        </Card>
      </Box>
    </BoxWrapper>
  );
};

export { ServiceMembers };
