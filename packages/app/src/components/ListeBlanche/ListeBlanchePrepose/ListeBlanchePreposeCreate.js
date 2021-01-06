import React, { useContext } from "react";
import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card } from "rebass";

import { UserContext } from "~/components/UserContext";

import { ListeBlanchePreposeForm } from "./ListeBlanchePreposeForm";
import { CREATE_LB_USER_PREPOSE } from "./mutations";
import { ETABLISSEMENTS } from "./queries";

export const ListeBlanchePreposeCreate = () => {
  const apolloClient = useApolloClient();
  const { type } = useContext(UserContext);
  const history = useHistory();

  const [createLbPrepose] = useMutation(CREATE_LB_USER_PREPOSE, {
    onCompleted: async () => {
      await history.push(`/${type}/liste-blanche`);
    },
  });

  return (
    <Card p={5}>
      <ListeBlanchePreposeForm
        editMode={false}
        handleSubmit={async (values) => {
          await createLbPrepose({
            variables: {
              email: values.email,
              etablissements: values.etablissements.map((e) => {
                return {
                  etablissement_id: e.id,
                  etablissement_rattachement: e.etablissement_rattachement,
                };
              }),
              nom: values.lastname,
              prenom: values.firstname,
            },
          });
        }}
        searchEtablissements={async (value) => {
          const { data } = await apolloClient.query({
            query: ETABLISSEMENTS,
            variables: {
              input: `%${value}%`,
            },
          });
          return data ? data.etablissements : [];
        }}
      />
    </Card>
  );
};

export default ListeBlanchePreposeCreate;
