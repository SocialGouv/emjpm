import { useApolloClient, useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import React from "react";
import { Box } from "rebass";

import { useDepartements } from "../../util/departements/useDepartements.hook";
import { captureException } from "../../util/sentry";
import serviceSiretExists from "../../util/serviceSiretExists";
import { ADD_SERVICE } from "./mutations";
import { ServiceForm } from "./ServiceForm";
import { cardStyle } from "./style";

export const ServiceCreate = (props) => {
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

    try {
      await addService({
        variables: {
          adresse: values.adresse,
          code_postal: values.code_postal,
          department_id: departements.find(
            (dep) => dep.code === values.departement
          ).id,
          email: values.email,
          etablissement: values.etablissement,
          siret: values.siret,
          telephone: values.telephone,
          ville: values.ville,
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
    <Box sx={cardStyle} width="100%">
      <ServiceForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </Box>
  );
};

export default ServiceCreate;
