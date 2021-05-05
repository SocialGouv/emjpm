import { useMutation } from "@apollo/client";

import { Card } from "rebass";

import { LB_USER } from "../queries";
import { ListeBlancheIndividuelForm } from "./ListeBlancheIndividuelForm";
import { UPDATE_DEPARTEMENT_FINANCEUR, UPDATE_LB_USER } from "./mutations";
import useQueryReady from "~/hooks/useQueryReady";

export function ListeBlancheIndividuelUpdate(props) {
  const { id, data, handleSubmit, handleCancel } = props;

  const [
    updateListeBlanche,
    { loading: loading1, error: error1 },
  ] = useMutation(UPDATE_LB_USER, {
    refetchQueries: [{ query: LB_USER, variables: { id } }],
  });
  useQueryReady(loading1, error1);

  const [
    setDepartementFinanceur,
    { loading: loading2, error: error2 },
  ] = useMutation(UPDATE_DEPARTEMENT_FINANCEUR, {
    refetchQueries: [{ query: LB_USER, variables: { id } }],
  });
  useQueryReady(loading2, error2);

  return (
    <Card p={5}>
      <ListeBlancheIndividuelForm
        editMode={true}
        data={data}
        handleCancel={handleCancel}
        handleSubmit={async (values) => {
          const { lb_departements } = data;

          const departementsToDelete = lb_departements.filter((d) => {
            return !values.departements.map((d) => d.id).includes(d.id);
          });

          const departementsToAdd = values.departements.filter((d) => {
            return !lb_departements.map((d) => d.id).includes(d.id);
          });

          const departementsToDeleteIds = departementsToDelete.map((d) => d.id);
          const departementFinanceur = values.departements.find(
            (d) => d.departement_financeur
          );

          await updateListeBlanche({
            variables: {
              adresse1: values.adresse1,
              adresse2: values.adresse2,
              code_postal: values.code_postal,
              departementsToAdd: departementsToAdd.map((d) => {
                return {
                  departement_financeur: d.departement_financeur,
                  departement_code: d.id,
                  lb_user_id: id,
                };
              }),
              departementsToDelete: departementsToDeleteIds,
              email: values.email,
              id,
              nom: values.nom,
              prenom: values.prenom,
              siret: values.siret,
              ville: values.ville,
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
    </Card>
  );
}

export default ListeBlancheIndividuelUpdate;
