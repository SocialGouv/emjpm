import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Text } from "@emjpm/ui";
import Link from "next/link";
import React, { Fragment, useCallback } from "react";
import { Box, Flex } from "rebass";

import { AccessToken } from "../AccessToken";
import AdminUsersMagistratTribunal from "./AdminUsersMagistratTribunal";
import AdminUsersTribunaux from "./AdminUsersTribunaux";
import { ACTIVATE_USER } from "./mutations";
import { USER } from "./queries";

import { isMandataire } from "../../../src/util";

const AdminUserInformations = (props) => {
  const { userId } = props;
  const { data, loading, error } = useQuery(USER, { variables: { userId } });
  const [activateUser] = useMutation(ACTIVATE_USER);

  const toggleActivation = useCallback(() => {
    const [{ active, id }] = data.users;

    activateUser({
      variables: {
        active: !active,
        id,
      },
    });
  }, [activateUser, data]);

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const [user] = data.users;
  const { active, id, type, nom, prenom, email } = user;
  const activateButtonStyle = active ? "warning" : "primary";
  const activateButtonText = active ? "Bloquer" : "Activer";

  return (
    <Fragment>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          ID
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{id}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Type
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{type}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Email
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{email}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Nom / Prenom
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>
            {prenom} {nom}
          </Text>
        </Box>
      </Flex>
      {isMandataire(user.type) && (
        <Flex mb={4}>
          <Box width={1 / 3} p={2} bg="cardSecondary">
            SIRET
          </Box>
          <Box width={2 / 3} px={4} py={2}>
            <Text>{user.mandataire.siret}</Text>
          </Box>
        </Flex>
      )}

      {user.type === "service" ? (
        <Flex mb={4}>
          <Box width={1 / 3} p={2} bg="cardSecondary">
            Service
          </Box>
          <Box width={2 / 3} px={4} py={2}>
            {user.service_members &&
              user.service_members.map((val) => {
                const { etablissement, id } = val.service;
                return (
                  <Link
                    href={`/admin/services/[service_id]`}
                    as={`/admin/services/${id}`}
                    key={`aui-${etablissement}`}
                  >
                    {etablissement}
                  </Link>
                );
              })}
          </Box>
        </Flex>
      ) : (
        <Flex mb={4}>
          <Box width={1 / 3} p={2} bg="cardSecondary">
            Tribunaux
          </Box>
          <Box width={2 / 3} px={4} py={2}>
            {user.type === "ti" && <AdminUsersMagistratTribunal id={user.id} />}
            {(user.type === "individuel" || user.type === "prepose") && (
              <AdminUsersTribunaux id={user.id} />
            )}
          </Box>
        </Flex>
      )}

      <Flex>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Activer / Bloquer
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Button mr={2} bg={activateButtonStyle} onClick={toggleActivation}>
            {activateButtonText}
          </Button>
        </Box>
      </Flex>
      <Box mt="2">
        <AccessToken bg="cardSecondary" isAdmin userId={id} />
      </Box>
    </Fragment>
  );
};

export { AdminUserInformations };
