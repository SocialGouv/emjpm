import { useMutation, useQuery } from "@apollo/client";
import { stdFormatter } from "@emjpm/biz";
import React, { Fragment } from "react";
import { Box, Flex } from "rebass";

import { CheckBox, Heading2, Text } from "~/ui";

import {
  DELETE_SERVICE_MEMBER,
  UPDATE_SERVICE_MEMBER_IS_ADMIN,
} from "./mutations";
import { SERVICE_MEMBERS } from "./queries";
import {
  listActionsStyle,
  listActionStyle,
  listAdminStyle,
  listDateStyle,
  listEmailStyle,
  listStyle,
} from "./styles";

const ServiceMembers = (props) => {
  const { isAdmin, service, userId } = props;
  const [deleteServiceMember] = useMutation(DELETE_SERVICE_MEMBER);
  const [updateServiceMemberIsAdmin] = useMutation(
    UPDATE_SERVICE_MEMBER_IS_ADMIN
  );

  const { loading, error, data } = useQuery(SERVICE_MEMBERS, {
    variables: { serviceId: service.id },
  });

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return "Error...";
  }

  const handleDelete = async (id) => {
    await deleteServiceMember({
      refetchQueries: ["ServiceMembers"],
      variables: { id },
    });
  };

  const handleIsAdminUpdate = async (id, isAdmin) => {
    updateServiceMemberIsAdmin({
      refetchQueries: ["ServiceMembers"],
      variables: {
        id,
        is_admin: isAdmin,
      },
    });
  };

  const { service_members } = data;
  return (
    <Box mb="4">
      <Heading2 width={[1]} mb="2">
        Membres du service et accès
      </Heading2>
      {service_members.map((member, i) => {
        return (
          <Flex sx={listStyle} index={i} key={member.user.email}>
            <Box sx={listEmailStyle}>{member.user.email}</Box>
            <Text sx={listDateStyle}>
              {`Inscrit le `}
              {stdFormatter.formatDateUI(member.user.created_at)}
            </Text>
            <Text sx={listDateStyle}>
              {member.user.active
                ? "Utilisateur actif"
                : "En attente de d'activation"}
            </Text>
            <Box sx={listAdminStyle}>
              {isAdmin ? (
                <Fragment>
                  {userId === member.user_id ? (
                    <Text fontWeight="bold" color="black" sx={listDateStyle}>
                      Administrateur
                    </Text>
                  ) : (
                    <Box sx={{ cursor: "pointer" }}>
                      <CheckBox
                        isChecked={member.is_admin}
                        onChange={() =>
                          handleIsAdminUpdate(member.id, !member.is_admin)
                        }
                        label="Administrateur"
                      />
                    </Box>
                  )}
                </Fragment>
              ) : (
                <Text fontWeight="bold" color="black" sx={listDateStyle}>
                  Membre
                </Text>
              )}
            </Box>
            {isAdmin && userId !== member.user_id && (
              <Box sx={listActionsStyle}>
                <Box
                  sx={listActionStyle}
                  onClick={() => handleDelete(member.id)}
                >
                  Supprimer l’utilisateur
                </Box>
              </Box>
            )}
          </Flex>
        );
      })}
    </Box>
  );
};

export { ServiceMembers };
