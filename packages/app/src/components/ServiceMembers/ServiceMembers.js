import { useMutation, useQuery } from "@apollo/react-hooks";
import { BoxWrapper, CheckBox, Heading2, Text } from "@socialgouv/emjpm-ui-core";
import { format } from "date-fns";
import React from "react";
import { Box, Flex } from "rebass";

import { DELETE_SERVICE_MEMBER, UPDATE_SERVICE_MEMBER_IS_ADMIN } from "./mutations";
import { SERVICE_MEMBERS } from "./queries";
import {
  listActionsStyle,
  listActionStyle,
  listAdminStyle,
  listDateStyle,
  listEmailStyle,
  listStyle
} from "./styles";

const ServiceMembers = props => {
  const { isAdmin, service } = props;
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
    <BoxWrapper>
      <Box>
        <Heading2 width={[1]} mb="2">
          Membres du service et accès
        </Heading2>
        {service_members.map((member, i) => (
          <Flex sx={listStyle} index={i} key={member.user.email}>
            <Box sx={listEmailStyle}>{member.user.email}</Box>
            <Text sx={listDateStyle}>
              {`Inscrit le `}
              {format(new Date(member.user.created_at), "dd/MM/yyyy")}
            </Text>
            <Text sx={listDateStyle}>
              {member.user.active ? "Utilisateur actif" : "En attente de d'activation"}
            </Text>
            <Box sx={listAdminStyle}>
              {isAdmin ? (
                <Box sx={{ cursor: "pointer" }}>
                  <CheckBox
                    isChecked={member.is_admin}
                    onChange={() => handleIsAdminUpdate(member.id, !member.is_admin)}
                    label="Administrateur"
                  />
                </Box>
              ) : (
                <Text fontWeight="bold" color="black" sx={listDateStyle}>
                  Membre
                </Text>
              )}
            </Box>
            {isAdmin && (
              <Box sx={listActionsStyle}>
                <Box sx={listActionStyle} onClick={() => handleDelete(member.id)}>
                  Supprimer l’utilisateur
                </Box>
              </Box>
            )}
          </Flex>
        ))}
      </Box>
    </BoxWrapper>
  );
};

export { ServiceMembers };
