import { useApolloClient, useMutation } from "@apollo/client";

import { useHistory } from "react-router-dom";
import { Card } from "rebass";

import { useDepartements } from "~/utils/departements/useDepartements.hook";
import { captureException } from "~/user/sentry";
import serviceSiretExists from "~/query-service/emjpm-hasura/serviceSiretExists.js";

import { ListeBlancheServiceForm } from "./ListeBlancheServiceForm";
import { ADD_SERVICE } from "./mutations";
import useQueryReady from "~/hooks/useQueryReady";

export function ListeBlancheServiceCreate(props) {
  const { handleCancel, onSuccess } = props;
  const history = useHistory();
  const client = useApolloClient();
  const { departements } = useDepartements();

  const [addService, { loading, error }] = useMutation(ADD_SERVICE, {
    onCompleted: () => history.push("/admin/services"),
  });
  useQueryReady(loading, error);

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    const siretExists = await serviceSiretExists(client, values.siret);

    if (siretExists) {
      setErrors({ siret: "Le siret est déjà utilisé" });
      setSubmitting(false);
      return;
    }

    try {
      await addService({
        variables: {
          departements: values.departements,
          email: values.email,
          etablissement: values.etablissement,
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
      />
    </Card>
  );
}

export default ListeBlancheServiceCreate;
