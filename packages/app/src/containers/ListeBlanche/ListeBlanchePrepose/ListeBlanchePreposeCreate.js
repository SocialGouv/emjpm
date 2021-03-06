import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card } from "rebass";

import useUser from "~/hooks/useUser";

import { ListeBlanchePreposeForm } from "./ListeBlanchePreposeForm";
import { CREATE_LB_USER_PREPOSE } from "./mutations";
import { ETABLISSEMENTS } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

export function ListeBlanchePreposeCreate() {
  const apolloClient = useApolloClient();
  const { type } = useUser();
  const history = useHistory();

  const [createLbPrepose, { loading, error }] = useMutation(
    CREATE_LB_USER_PREPOSE,
    {
      onCompleted: async () => {
        await history.push(`/${type}/liste-blanche`);
      },
    }
  );
  useQueryReady(loading, error);

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
}

export default ListeBlanchePreposeCreate;
