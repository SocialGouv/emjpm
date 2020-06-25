import { useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Spinner } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

import { LB_USER } from "./queries";

const ListeBlancheDetail = ({ lbUserId }) => {
  const { data, error, loading } = useQuery(LB_USER, {
    variables: {
      id: lbUserId,
    },
  });

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }
  const [user] = data.lb_users;

  return <h1>{user.nom}</h1>;
};

export { ListeBlancheDetail };
