import { useMutation } from "@apollo/client";
import { Card } from "rebass";
import { Helmet } from "react-helmet";

import { LISTE_BLANCHE_BY_PK } from "../queries";
import ListeBlancheDpfiForm from "./ListeBlancheDpfiForm";
import {
  UPDATE_DEPARTEMENT_FINANCEUR,
  UPDATE_LISTE_BLANCHE,
} from "./mutations";
import useQueryReady from "~/hooks/useQueryReady";

export function ListeBlancheDpfiUpdate(props) {
  const { id, data, handleSubmit, handleCancel } = props;

  const [updateListeBlanche, { loading: loading1, error: error1 }] =
    useMutation(UPDATE_LISTE_BLANCHE, {
      refetchQueries: [{ query: LISTE_BLANCHE_BY_PK, variables: { id } }],
    });
  useQueryReady(loading1, error1);

  const [setDepartementFinanceur, { loading: loading2, error: error2 }] =
    useMutation(UPDATE_DEPARTEMENT_FINANCEUR, {
      refetchQueries: [{ query: LISTE_BLANCHE_BY_PK, variables: { id } }],
    });
  useQueryReady(loading2, error2);

  return (
    <>
      <Helmet>
        <title>
          {data.nom} {data.prenom} - Mandataire DPF | e-MJPM
        </title>
      </Helmet>
      <Card p={5}>
        <ListeBlancheDpfiForm
          editMode={true}
          data={data}
          handleCancel={handleCancel}
          handleSubmit={async (values) => {
            const { dpfi_departements } = data;

            const departementsToDelete = dpfi_departements.filter((d) => {
              return !values.departements.map((d) => d.id).includes(d.id);
            });

            const departementsToAdd = values.departements.filter((d) => {
              return !dpfi_departements.map((d) => d.id).includes(d.id);
            });

            const departementsToDeleteIds = departementsToDelete.map(
              (d) => d.id
            );
            const departementFinanceur = values.departements.find(
              (d) => d.departement_financeur
            );

            await updateListeBlanche({
              variables: {
                adresse: values.adresse,
                adresse_complement: values.adresse_complement,
                code_postal: values.code_postal,
                departementsToAdd: departementsToAdd.map((d) => {
                  return {
                    departement_financeur: d.departement_financeur,
                    departement_code: d.id,
                    liste_blanche_id: id,
                  };
                }),
                departementsToDelete: departementsToDeleteIds,
                email: values.email,
                id,
                genre: values.genre,
                nom: values.nom,
                prenom: values.prenom,
                siret: values.siret,
                ville: values.ville,
                telephone: values.telephone,
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
    </>
  );
}

export default ListeBlancheDpfiUpdate;
