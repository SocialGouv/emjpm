import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card } from "rebass";

import { UserContext } from "~/components/UserContext";

import { ListeBlancheIndividuelForm } from "./ListeBlancheIndividuelForm";
import { CREATE_LB_USER_INDIVIDUEL } from "./mutations";

export function ListeBlancheIndividuelCreate() {
  const history = useHistory();
  const { type } = useContext(UserContext);
  const [create, { loading }] = useMutation(CREATE_LB_USER_INDIVIDUEL);

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
              adresse1: values.adresse1,
              adresse2: values.adresse2,
              code_postal: values.code_postal,
              departements: values.departements.map((d) => {
                return {
                  departement_financeur: d.departement_financeur,
                  departement_id: d.id,
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
