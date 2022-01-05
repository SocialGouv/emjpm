import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card } from "rebass";

import useUser from "~/hooks/useUser";
import useQueryReady from "../../../hooks/useQueryReady";

import { ListeBlancheIndividuelForm } from "./ListeBlancheIndividuelForm";
import { CREATE_LISTE_BLANCHE_INDIVIDUEL } from "./mutations";

export function ListeBlancheIndividuelCreate() {
  const history = useHistory();
  const { type } = useUser();
  const [create, { loading, error }] = useMutation(
    CREATE_LISTE_BLANCHE_INDIVIDUEL
  );

  useQueryReady(loading, error);

  return (
    <Card p={5}>
      <ListeBlancheIndividuelForm
        editMode={false}
        loading={loading}
        handleCancel={() => {
          history.push(`/${type}/liste-blanche`);
        }}
        handleSubmit={async (values) => {
          await create({
            variables: {
              adresse: values.adresse,
              adresse_complement: values.adresse_complement,
              code_postal: values.code_postal,
              departements: values.departements.map((d) => {
                return {
                  departement_financeur: d.departement_financeur,
                  departement_code: d.id,
                };
              }),
              email: values.email,
              nom: values.nom,
              prenom: values.prenom,
              siret: values.siret,
              type: values.type,
              ville: values.ville,
            },
          });
          await history.push(`/${type}/liste-blanche`);
        }}
      />
    </Card>
  );
}

export default ListeBlancheIndividuelCreate;
