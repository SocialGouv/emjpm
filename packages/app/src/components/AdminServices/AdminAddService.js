import { useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React from "react";

import { AdminServiceForm } from "./AdminServiceForm";
import { ADD_SERVICE } from "./mutations";
import { DEPARTEMENTS } from "./queries";

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

  const handleSubmit = async (values, { setSubmitting }) => {
    const { city, depcode, label, lat, lng, postcode } = values.geocode;
    const department = departements.find(d => d.id === depcode);

    try {
      await addService({
        variables: {
          adresse: label,
          code_postal: postcode,
          department_id: department.id,
          email: values.email,
          etablissement: values.etablissement,
          telephone: values.telephone,
          ville: city,
          latitude: lat,
          longitude: lng
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

  return <AdminServiceForm handleSubmit={handleSubmit} handleCancel={handleCancel} />;
};
