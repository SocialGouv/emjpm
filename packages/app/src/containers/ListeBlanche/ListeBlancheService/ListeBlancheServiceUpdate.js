import { useMutation, useQuery } from "@apollo/client";

import { Card } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { captureException } from "~/user/sentry";

import { ListeBlancheServiceForm } from "./ListeBlancheServiceForm";
import { UPDATE_SERVICE } from "./mutations";
import { SERVICE } from "./queries";

export function ListeBlancheServiceUpdate(props) {
  const { listeBlancheId, onSuccess, handleCancel } = props;
  const { data, loading, error } = useQuery(SERVICE, {
    fetchPolicy: "network-only",
    variables: { listeBlancheId },
  });
  const [updateService, { loading: loading2, error: error2 }] =
    useMutation(UPDATE_SERVICE);
  useQueryReady(loading2, error2);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { liste_blanche_by_pk: lbService } = data;
  const { service } = lbService;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateService({
        refetchQueries: ["services", "services_aggregate"],
        variables: {
          liste_blanche_id: lbService.id,
          service_id: service.id,
          service_departements: values.departements.map((dep) => ({
            ...dep,
            service_id: service.id,
          })),
          departement_codes: values.departements.map(
            ({ departement_code }) => departement_code
          ),
          email: values.email,
          etablissement: values.etablissement,
          adresse: values.adresse,
          code_postal: values.code_postal,
          ville: values.ville,
          org_adresse: values.org_adresse,
          org_code_postal: values.org_code_postal,
          org_gestionnaire: !!values.org_gestionnaire,
          org_nom: values.org_nom,
          org_ville: values.org_ville,
          siret: values.siret,
          genre: values.genre,
          nom: values.nom,
          prenom: values.prenom,
          telephone: values.telephone,
        },
      });

      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      captureException(error);
      // TODO(plaunay) display "Une erreur est survenue, veuillez réessayer plus tard."
    }

    setSubmitting(false);
  };

  return (
    <Card p={5}>
      <ListeBlancheServiceForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        lbService={lbService}
      />
    </Card>
  );
}

export default ListeBlancheServiceUpdate;
