import { useMutation, useQuery } from "@apollo/react-hooks";
import { Card } from "@emjpm/ui";
import Router from "next/router";
import React from "react";

import { captureException } from "../../util/sentry";
import { EDIT_ANTENNE } from "./mutations";
import { GET_SERVICES } from "./queries";
import { ServiceEditForm } from "./ServiceEditForm";

const ServiceEdit = () => {
  const { data, error, loading } = useQuery(GET_SERVICES);

  const [editAntenne] = useMutation(EDIT_ANTENNE, {
    update() {
      Router.push("/services/informations", `/services/informations`, {
        shallow: true,
      });
    },
  });

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Une erreur est survenue, veuillez réessayer plus tard</div>;
  }

  const [service] = data.services;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await editAntenne({
        refetchQueries: ["Service", "users"],
        variables: {
          adresse: values.geocode.label,
          code_postal: values.geocode.postcode,
          competences: values.competences,
          dispo_max: values.dispo_max,
          email: values.email,
          etablissement: values.etablissement,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude,
          nom: values.nom,
          prenom: values.prenom,
          service_id: service.id,
          telephone: values.telephone,
          ville: values.geocode.city,
        },
      });
    } catch (error) {
      captureException(error);
      // TODO(plaunay) display "Une erreur est survenue, veuillez réessayer plus tard."
    }

    setSubmitting(false);
  };
  return (
    <Card p="5">
      <ServiceEditForm handleSubmit={handleSubmit} service={service} />
    </Card>
  );
};

export { ServiceEdit };
