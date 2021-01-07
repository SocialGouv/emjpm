import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { ServiceAntenneForm } from "~/components/ServiceAntenneForms";
import { UserContext } from "~/components/UserContext";
import { Card } from "~/ui";
import { captureException } from "~/util/sentry";

import { CREATE_ANTENNE } from "./mutations";

const ServiceCreateAntenne = () => {
  const history = useHistory();
  const { service_members } = useContext(UserContext);
  const [currentUserService] = service_members;
  const { service_id } = currentUserService;

  const [createAntenne] = useMutation(CREATE_ANTENNE);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createAntenne({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          adresse: values.geocode.label,
          code_postal: values.geocode.postcode,
          contact_email: values.contact_email,
          contact_firstname: values.contact_firstname,
          contact_lastname: values.contact_lastname,
          contact_phone: values.contact_phone,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude,
          mesures_max: values.mesures_max,
          name: values.name,
          service_id: service_id,
          ville: values.geocode.city,
        },
      });
    } catch (error) {
      captureException(error);
      // TODO(plaunay) display "Une erreur est survenue, veuillez réessayer plus tard."
    }

    setSubmitting(false);
    history.push("/services/informations");
  };

  return (
    <Card p="5">
      <ServiceAntenneForm handleSubmit={handleSubmit} />
    </Card>
  );
};

export { ServiceCreateAntenne };
