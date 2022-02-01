import { useApolloClient, useMutation } from "@apollo/client";
import { Card } from "rebass";
import { Helmet } from "react-helmet";

import { ListeBlanchePreposeForm } from "./ListeBlanchePreposeForm";
import { UPDATE_LISTE_BLANCHE_PREPOSE } from "./mutations";
import { ETABLISSEMENTS } from "./queries";
import { LISTE_BLANCHE_BY_PK } from "../queries";
import useQueryReady from "~/hooks/useQueryReady";

export function ListeBlanchePreposeUpdate(props) {
  const { data, handleSubmit } = props;
  const apolloClient = useApolloClient();
  const [updateListeBlanche, { loading, error }] = useMutation(
    UPDATE_LISTE_BLANCHE_PREPOSE,
    {
      refetchQueries: [
        { query: LISTE_BLANCHE_BY_PK, variables: { id: data.id } },
      ],
    }
  );
  useQueryReady(loading, error);

  return (
    <>
      <Helmet>
        <title>
          {data.nom} {data.prenom} - Mandataire préposé | e-MJPM
        </title>
      </Helmet>
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
            const {
              firstname: prenom,
              lastname: nom,
              genre,
              email,
              telephone,
            } = values;
            await updateListeBlanche({
              variables: {
                data: {
                  nom,
                  prenom,
                  genre,
                  telephone,
                  email,
                },
                etablissements: etablissements.map((e) => {
                  return {
                    etablissement_id: e.id,
                    etablissement_rattachement: e.etablissement_rattachement,
                    liste_blanche_id: data.id,
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
    </>
  );
}

export default ListeBlanchePreposeUpdate;
