import { useApolloClient, useMutation } from "@apollo/client";

import { useHistory } from "react-router-dom";
import { Card } from "rebass";

import { captureException } from "~/user/sentry";
import sdpfSiretExists from "~/query-service/emjpm-hasura/serviceSiretExists.js";

import { ListeBlancheSdpfForm } from "./ListeBlancheSdpfForm";
import { ADD_SDPF } from "./mutations";
import useQueryReady from "~/hooks/useQueryReady";

export function ListeBlancheSdpfCreate(props) {
  const { handleCancel, onSuccess } = props;
  const history = useHistory();
  const client = useApolloClient();

  const [addSdpf, { loading, error }] = useMutation(ADD_SDPF, {
    onCompleted: () => history.push("/admin/liste-blanche"),
  });
  useQueryReady(loading, error);

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    const siretExists = await sdpfSiretExists(client, values.siret);

    if (siretExists) {
      setErrors({ siret: "Le siret est déjà utilisé" });
      setSubmitting(false);
      return;
    }

    try {
      await addSdpf({
        variables: {
          departement: values.departement,
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
          telephone: values.telephone,
          genre: values.genre,
          nom: values.nom,
          prenom: values.prenom,
        },
      });

      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      captureException(error);
    }

    setSubmitting(false);
  };

  return (
    <Card p={5} id="list_blanche_service_create" tabIndex="-1">
      <ListeBlancheSdpfForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Card>
  );
}

export default ListeBlancheSdpfCreate;
