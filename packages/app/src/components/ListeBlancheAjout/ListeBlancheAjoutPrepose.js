import React from "react";
import { useApolloClient } from "react-apollo";
import { Box } from "rebass";

import { ListeBlancheAjoutPreposeForm } from "./ListeBlancheAjoutPreposeForm";
import { ETABLISSEMENTS } from "./queries";

export const ListeBlancheAjoutPrepose = () => {
  const apolloClient = useApolloClient();

  return (
    <Box mt={4}>
      <ListeBlancheAjoutPreposeForm
        handleSubmit={() => {}}
        searchEtablissements={async (value) => {
          const { data } = await apolloClient.query({
            query: ETABLISSEMENTS,
            variables: {
              input: `${value}%`,
            },
          });
          return data ? data.etablissements : [];
        }}
      />
    </Box>
  );
};

export default ListeBlancheAjoutPrepose;
