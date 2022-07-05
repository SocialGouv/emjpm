import { useMutation, useQuery } from "@apollo/client";
import { stdFormatter } from "@emjpm/biz";

import { Box, Flex } from "rebass";

import { CheckBox, Heading, Text } from "~/components";

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

import useQueryReady from "~/hooks/useQueryReady";

function SdpfMembers(props) {
  const { isAdmin, service, userId } = props;

  const { loading, error, data } = useQuery(SERVICE_MEMBERS, {
    variables: { serviceId: service.id },
  });

  const [deleteServiceMember, { loading: loading1, error: error1 }] =
    useMutation(DELETE_SERVICE_MEMBER);
  useQueryReady(loading1, error1);
  const [updateServiceMemberIsAdmin, { loading: loading2, error: error2 }] =
    useMutation(UPDATE_SERVICE_MEMBER_IS_ADMIN);
  useQueryReady(loading2, error2);

  if (!useQueryReady(loading, error)) {
    return null;
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

  const { sdpf_members: service_members } = data;

  return (
    <Box mb="4">
      <Heading size={2} width={[1]} mb="2">
        Membres du service et accès
      </Heading>
      {service_members.map((member, i) => {
        return (
          <Flex sx={listStyle} index={i} key={member.user.email}>
            <Box sx={listEmailStyle}>{member.user.email}</Box>
            <Text sx={listDateStyle}>
              {"Inscrit le "}
              {stdFormatter.formatDateUI(member.user.created_at)}
            </Text>
            <Text sx={listDateStyle}>
              {member.user.active
                ? "Utilisateur actif"
                : "En attente de d'activation"}
            </Text>
            <Box sx={listAdminStyle}>
              {isAdmin ? (
                <>
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
                </>
              ) : (
                <Text fontWeight="bold" color="black" sx={listDateStyle}>
                  {member.is_admin ? "Administrateur" : "Membre"}
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
}

export { SdpfMembers };
