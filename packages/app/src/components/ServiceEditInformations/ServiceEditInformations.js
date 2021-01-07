import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Card } from "~/ui";

import { EDIT_SERVICE } from "./mutations";
import { GET_SERVICES } from "./queries";
import { ServiceEditInformationsForm } from "./ServiceEditInformationsForm";

const ServiceEditInformations = ({ cancelLink, successLink }) => {
  const { service_id: serviceId } = useParams();
  const history = useHistory();
  const { data, error, loading } = useQuery(GET_SERVICES, {
    variables: {
      serviceId,
    },
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const [editService] = useMutation(EDIT_SERVICE, {
    onError(error) {
      setErrorMessage(error);
    },
    update() {
      if (successLink) {
        history.push(successLink, successLink, {
          shallow: true,
        });
      }
    },
  });

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Une erreur est survenue, veuillez réessayer plus tard</div>;
  }

  const { services_by_pk: service } = data;

  const handleSubmit = async (values, { setSubmitting }) => {
    await editService({
      refetchQueries: ["CURRENT_USER_QUERY"],
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
        service_tis: values.tis.map((ti) => ({
          service_id: service.id,
          ti_id: ti,
        })),
        telephone: values.telephone,
        ville: values.geocode.city,
      },
    });

    setSubmitting(false);
  };
  return (
    <Card p="5">
      <ServiceEditInformationsForm
        handleSubmit={handleSubmit}
        cancelLink={cancelLink}
        service={service}
        errorMessage={errorMessage}
      />
    </Card>
  );
};

export { ServiceEditInformations };
