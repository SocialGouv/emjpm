import { useMutation, useQuery } from "@apollo/react-hooks";
import { BoxWrapper, Card, Heading2, Heading4, Select, Text } from "@socialgouv/emjpm-ui-core";
import { format } from "date-fns";
import React from "react";
import { Box, Flex } from "rebass";
import { Trash } from "styled-icons/boxicons-regular";

import { DELETE_SERVICE_MEMBER, UPDATE_SERVICE_MEMBER_IS_ADMIN } from "./mutations";
import { SERVICE_MEMBERS } from "./queries";
import { ServiceMemberInvitations } from "./ServiceMemberInvitations";
import {
  listActionsStyle,
  listActionStyle,
  listAdminStyle,
  listDateStyle,
  listEmailStyle,
  listIdStyle,
  listStyle
} from "./styles";

const ServiceMembers = props => {
  const { isAdmin, service } = props;
  const isAdminOptions = [
    { label: "Administrateur", value: true },
    { label: "Membre", value: false }
  ];

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
          <ServiceMemberInvitations isAdmin={isAdmin} service={service} />
        </Card>
      </Box>
      <Box mb={4}>
        <Heading2 width={[1]} mb="2">
          Membres
        </Heading2>
        <Card p={4} width={[1]}>
          <Heading4 mb="2">Liste des membres ({service_members.length})</Heading4>
          {service_members.map((member, i) => (
            <Flex sx={() => listStyle(i)} index={i} key={member.user.email}>
              <Box sx={listIdStyle}>{member.id}.</Box>
              <Box sx={listEmailStyle}>{member.user.email}</Box>
              <Text sx={listDateStyle}>
                {`Inscrit le `}
                {format(new Date(member.user.created_at), "dd/MM/yyyy")}
              </Text>
              <Box sx={listAdminStyle}>
                {isAdmin ? (
                  <Select
                    id="urgent"
                    name="urgent"
                    width={200}
                    placeholder="Est-ce une demande urgente"
                    value={member.is_admin ? isAdminOptions[0] : isAdminOptions[1]}
                    hasError
                    onChange={({ value }) => handleIsAdminUpdate(member.id, value)}
                    options={isAdminOptions}
                  />
                ) : member.is_admin ? (
                  "Administrateur"
                ) : (
                  "Membre"
                )}
              </Box>
              <Text sx={listDateStyle}>
                {member.user.active ? "Activé" : "En attente de d'activation"}
              </Text>
              {isAdmin && (
                <Box sx={listActionsStyle}>
                  <Box sx={listActionStyle} onClick={() => handleDelete(member.id)}>
                    <Trash title="Supprimer" size="22" />
                  </Box>
                </Box>
              )}
            </Flex>
          ))}
        </Card>
      </Box>
    </BoxWrapper>
  );
};

export { ServiceMembers };
