import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card } from "rebass";

import useUser from "~/hooks/useUser";
import useQueryReady from "../../../hooks/useQueryReady";

import ListeBlancheDpfiForm from "./ListeBlancheDpfiForm";
import { CREATE_LISTE_BLANCHE_DPFI } from "./mutations";

export function ListeBlancheIndividuelCreate() {
  const history = useHistory();
  const { type } = useUser();
  const [create, { loading, error }] = useMutation(CREATE_LISTE_BLANCHE_DPFI);

  const handleSubmit = async (values) => {
    console.log(values);
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
        genre: values.genre,
        email: values.email,
        telephone: values.telephone,
        nom: values.nom,
        prenom: values.prenom,
        siret: values.siret,
        type: values.type,
        ville: values.ville,
      },
    });
    if (type === "direction") {
      await history.push(`/${type}`);
    } else {
      await history.push(`/${type}/liste-blanche`);
    }
  };

  useQueryReady(loading, error);

  return (
    <Card p={5} id="liste_blanche_individuel_create" tabIndex="-1">
      <ListeBlancheDpfiForm
        editMode={false}
        loading={loading}
        handleCancel={() => {
          if (type === "direction") {
            history.push(`/${type}`);
          } else {
            history.push(`/${type}/liste-blanche`);
          }
        }}
        handleSubmit={handleSubmit}
      />
    </Card>
  );
}

export default ListeBlancheIndividuelCreate;
