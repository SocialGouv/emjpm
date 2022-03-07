import { useApolloClient, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card } from "rebass";

import useUser from "~/hooks/useUser";

import { ListeBlanchePreposeForm } from "./ListeBlanchePreposeForm";
import { CREATE_LISTE_BLANCHE_PREPOSE } from "./mutations";
import { ETABLISSEMENTS } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

export function ListeBlanchePreposeCreate() {
  const apolloClient = useApolloClient();
  const { type } = useUser();
  const history = useHistory();

  const [createLbPrepose, { loading, error }] = useMutation(
    CREATE_LISTE_BLANCHE_PREPOSE,
    {
      onCompleted: async () => {
        if (type === "direction") {
          await history.push(`/${type}`);
        } else {
          await history.push(`/${type}/liste-blanche`);
        }
      },
    }
  );
  useQueryReady(loading, error);

  return (
    <Card p={5} id="list_blanche_prepose_create" tabIndex="-1">
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
              nom: values.nom,
              prenom: values.prenom,
              telephone: values.telephone,
              genre: values.genre,
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
