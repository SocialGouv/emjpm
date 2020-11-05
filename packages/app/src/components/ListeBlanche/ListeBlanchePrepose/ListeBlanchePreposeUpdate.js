import React from "react";
import { useApolloClient, useMutation } from "react-apollo";
import { Card } from "rebass";

import { ListeBlanchePreposeForm } from "./ListeBlanchePreposeForm";
import { UPDATE_LB_USER_PREPOSE } from "./mutations";
import { ETABLISSEMENTS } from "./queries";

function getPropertiesToUpdate(values) {
  const propertiesToUpdate = {};
  if (values.firstname) {
    propertiesToUpdate.nom = values.firstname;
  }
  if (values.lastname) {
    propertiesToUpdate.prenom = values.lastname;
  }
  if (values.email) {
    propertiesToUpdate.email = values.email;
  }
  return propertiesToUpdate;
}

export const ListeBlanchePreposeUpdate = (props) => {
  const { data, handleSubmit } = props;
  const apolloClient = useApolloClient();
  const [updateListeBlanche] = useMutation(UPDATE_LB_USER_PREPOSE);

  return (
    <Card p={5}>
      <ListeBlanchePreposeForm
        data={data}
        editMode={true}
        searchEtablissements={async (value) => {
          const { data } = await apolloClient.query({
            query: ETABLISSEMENTS,
            variables: {
              input: `%${value}%`,
            },
          });
          return data ? data.etablissements : [];
        }}
        handleSubmit={async ({ etablissements, ...values }) => {
          const properties = getPropertiesToUpdate(values);

          await updateListeBlanche({
            variables: {
              data: properties,
              etablissements: etablissements.map((e) => {
                return {
                  etablissement_id: e.id,
                  etablissement_rattachement: e.etablissement_rattachement,
                  lb_user_id: data.id,
                };
              }),
              id: data.id,
            },
          });

          if (handleSubmit) {
            await handleSubmit(values);
          }
        }}
      />
    </Card>
  );
};

export default ListeBlanchePreposeUpdate;
