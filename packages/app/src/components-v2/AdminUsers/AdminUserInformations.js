import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Card, Text } from "@socialgouv/emjpm-ui-core";
import React, { useCallback } from "react";
import { Box } from "rebass";

import { AdminUserDetails } from "./AdminUserDetails";
import { ACTIVATE_USER } from "./mutations";
import { USER } from "./queries";

const AdminUserInformations = props => {
  const { userId } = props;
  const { data, loading, error } = useQuery(USER, { variables: { userId } });
  const [activateUser] = useMutation(ACTIVATE_USER);

  const toggleActivation = useCallback(() => {
    const [{ active, id }] = data.users;

    activateUser({
      variables: {
        active: !active,
        id
      }
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
    <Card mb={2}>
      <Box mb={2}>
        <Text color="textSecondary">ID</Text>
        <Text>{id}</Text>
      </Box>
      <Box mb={2}>
        <Text color="textSecondary">Type</Text>
        <Text>{type}</Text>
      </Box>
      <Box mb={2}>
        <Text color="textSecondary">Email</Text>
        <Text>{email}</Text>
      </Box>
      <Box mb={2}>
        <Text color="textSecondary">Prénom / Nom</Text>
        <Text>
          {prenom} {nom}
        </Text>
      </Box>
      <Box mb={2}>
        <AdminUserDetails user={user} />
      </Box>
      <Button bg={activateButtonStyle} onClick={toggleActivation}>
        {activateButtonText}
      </Button>
    </Card>
  );
};

export { AdminUserInformations };
