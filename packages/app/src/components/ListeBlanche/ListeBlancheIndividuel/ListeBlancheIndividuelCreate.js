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
      handleCancel={() => {
        router.push(`/${type}/liste-blanche`);
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
        await router.push(`/${type}/liste-blanche`);
      }}
    />
  );
};

export default ListeBlancheIndividuelCreate;
