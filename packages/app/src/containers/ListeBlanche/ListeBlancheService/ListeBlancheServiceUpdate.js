import { useMutation, useQuery } from "@apollo/client";
import { findDepartementByCodeOrId } from "@emjpm/biz";

import { Card } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { useDepartements } from "~/utils/departements/useDepartements.hook";
import { captureException } from "~/user/sentry";

import { ListeBlancheServiceForm } from "./ListeBlancheServiceForm";
import { UPDATE_SERVICE } from "./mutations";
import { SERVICE } from "./queries";

export function ListeBlancheServiceUpdate(props) {
  const { serviceId, onSuccess, handleCancel } = props;
  const { data, loading, error } = useQuery(SERVICE, {
    fetchPolicy: "network-only",
    variables: { serviceId },
  });
  const { departements } = useDepartements();
  const [updateService] = useMutation(UPDATE_SERVICE);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { services_by_pk: service } = data;

  const handleSubmit = async (values, { setSubmitting }) => {
    const departement = findDepartementByCodeOrId(departements, {
      code: values.departement,
    });

    try {
      await updateService({
        refetchQueries: ["services", "services_aggregate"],
        variables: {
          departement_code: departement.id,
          email: values.email,
          etablissement: values.etablissement,
          id: service.id,
          lb_adresse: values.lb_adresse,
          lb_code_postal: values.lb_code_postal,
          lb_ville: values.lb_ville,
          org_adresse: values.org_adresse,
          org_code_postal: values.org_code_postal,
          org_gestionnaire: values.org_gestionnaire,
          org_nom: values.org_nom,
          org_ville: values.org_ville,
          siret: values.siret,
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
        service={service}
      />
    </Card>
  );
}

export default ListeBlancheServiceUpdate;
