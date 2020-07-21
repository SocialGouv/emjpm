import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";

import { LoadingWrapper } from "../Commons";
import { ListeBlancheForm } from "../ListeBlancheForm";
import { UPDATE_DEPARTEMENT_FINANCEUR, UPDATE_LB_USER } from "./mutations";
import { LB_USER } from "./queries";

const ListeBlancheDetail = ({ id, handleSubmit }) => {
  const { data, error, loading } = useQuery(LB_USER, {
    variables: {
      id,
    },
  });

  const [updateListeBlanche] = useMutation(UPDATE_LB_USER, {
    refetchQueries: [{ query: LB_USER, variables: { id } }],
  });

  const [setDepartementFinanceur] = useMutation(UPDATE_DEPARTEMENT_FINANCEUR, {
    refetchQueries: [{ query: LB_USER, variables: { id } }],
  });

  const listeBlanche = data ? data.lb_users_by_pk : null;

  return (
    <LoadingWrapper loading={loading || !data} error={error}>
      <ListeBlancheForm
        editMode={true}
        data={listeBlanche}
        handleSubmit={async (values) => {
          const { lb_departements } = listeBlanche;

          const departementsToDelete = lb_departements.filter((d) => {
            return !values.departements.map((d) => d.id).includes(d.id);
          });

          const departementsToAdd = values.departements.filter((d) => {
            return !lb_departements.map((d) => d.id).includes(d.id);
          });

          const departementsToDeleteIds = departementsToDelete.map((d) => d.id);
          const departementFinanceur = values.departements.find((d) => d.departement_financeur);

          await updateListeBlanche({
            variables: {
              id,
              nom: values.nom,
              prenom: values.prenom,
              email: values.email,
              siret: values.siret,
              departementsToDelete: departementsToDeleteIds,
              departementsToAdd: departementsToAdd.map((d) => {
                return {
                  lb_user_id: id,
                  departement_financeur: d.departement_financeur,
                  departement_id: d.id,
                };
              }),
            },
          });

          if (departementFinanceur) {
            await setDepartementFinanceur({
              variables: {
                id: departementFinanceur.id,
              },
            });
          }

          await handleSubmit();
        }}
      />
    </LoadingWrapper>
  );
};

export { ListeBlancheDetail };
