import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useMutation } from "react-apollo";

import { UserContext } from "../../UserContext";
import { ListeBlancheIndividuelForm } from "./ListeBlancheIndividuelForm";
import { CREATE_LB_USER_INDIVIDUEL } from "./mutations";

export const ListeBlancheIndividuelCreate = () => {
  const router = useRouter();
  const { type } = useContext(UserContext);
  const [create, { loading }] = useMutation(CREATE_LB_USER_INDIVIDUEL);

  return (
    <ListeBlancheIndividuelForm
      editMode={false}
      loading={loading}
      handleSubmit={async (values) => {
        const variables = {
          email: values.email,
          nom: values.nom,
          prenom: values.prenom,
          siret: values.siret,
          type: values.type,
          departements: values.departements.map((d) => {
            return {
              departement_financeur: d.departement_financeur,
              departement_id: d.id,
            };
          }),
        };
        await create({
          variables,
        });
        await router.push(`/${type}/liste-blanche`);
      }}
    />
  );
};

export default ListeBlancheIndividuelCreate;
