import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { findDepartementByCodeOrId } from "@emjpm/biz";
import Router from "next/router";
import React from "react";
import { Card } from "rebass";

import { useDepartements } from "~/util/departements/useDepartements.hook";
import { captureException } from "~/util/sentry";
import serviceSiretExists from "~/util/serviceSiretExists";

import { ListeBlancheServiceForm } from "./ListeBlancheServiceForm";
import { ADD_SERVICE } from "./mutations";

export const ListeBlancheServiceCreate = (props) => {
  const { handleCancel, onSuccess } = props;
  const client = useApolloClient();
  const { departements } = useDepartements();

  const [addService] = useMutation(ADD_SERVICE, {
    onCompleted: () => Router.push("/admin/services"),
  });

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    const siretExists = await serviceSiretExists(client, values.siret);

    if (siretExists) {
      setErrors({ siret: "Le siret est déjà utilisé" });
      setSubmitting(false);
      return;
    }

    const departement = findDepartementByCodeOrId(departements, {
      code: values.departement,
    });

    try {
      await addService({
        variables: {
          department_id: departement.id,
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
};

export default ListeBlancheServiceCreate;
