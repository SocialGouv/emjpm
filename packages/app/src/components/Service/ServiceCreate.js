import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { Card } from "@emjpm/ui";
import Router from "next/router";
import React from "react";

import { captureException } from "../../util/sentry";
import serviceSiretExists from "../../util/serviceSiretExists";
import { ADD_SERVICE } from "./mutations";
import { DEPARTEMENTS } from "./queries";
import { ServiceForm } from "./ServiceForm";
import { cardStyle } from "./style";

export const ServiceCreate = (props) => {
  const { handleCancel, onSuccess } = props;
  const client = useApolloClient();

  const [addService] = useMutation(ADD_SERVICE, {
    onCompleted: () => Router.push("/admin/services"),
  });

  const { data, loading, error } = useQuery(DEPARTEMENTS);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { departements } = data;

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    const { depcode } = values.geocode;
    const department = departements.find((d) => d.code === depcode);
    const siretExists = await serviceSiretExists(client, values.siret);

    if (!department) {
      setErrors({ geocode: "L'adresse est invalide, veuillez la resaisir" });
      setSubmitting(false);
      return;
    } else if (siretExists) {
      setErrors({ siret: "Le siret est déjà utilisé" });
      setSubmitting(false);
      return;
    }

    try {
      await addService({
        variables: {
          adresse: values.geocode.label,
          code_postal: values.geocode.postcode,
          department_id: department.id,
          email: values.email,
          etablissement: values.etablissement,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude,
          siret: values.siret,
          telephone: values.telephone,
          ville: values.geocode.city,
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
    <Card sx={cardStyle} width="100%">
      <ServiceForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </Card>
  );
};

export default ServiceCreate;
