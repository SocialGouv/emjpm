import { useMutation, useQuery } from "@apollo/react-hooks";
import { Card } from "@socialgouv/emjpm-ui-core";
import Router from "next/router";
import React from "react";

import { AdminServiceForm } from "./AdminServiceForm";
import { ADD_SERVICE } from "./mutations";
import { DEPARTEMENTS } from "./queries";
import { cardStyle } from "./style";

export const AdminAddService = () => {
  const [addService] = useMutation(ADD_SERVICE, {
    onCompleted: () => Router.push("/admin/services")
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
    const department = departements.find(d => d.id === depcode);

    if (!department) {
      setErrors({ geocode: "L'adresse est invalide, veuillez la resaisir" });
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
          telephone: values.telephone,
          ville: values.geocode.city,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude
        }
      });
    } catch (error) {
      // TODO(paullaunay): log error in sentry and form
    }

    setSubmitting(false);
  };

  const handleCancel = () => {
    Router.push("/admin/services");
  };

  return (
    <Card sx={cardStyle} width="100%">
      <AdminServiceForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </Card>
  );
};
