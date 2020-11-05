import { useMutation } from "@apollo/react-hooks";
import { Card } from "@emjpm/ui";
import Router from "next/router";
import React, { useContext } from "react";

import { captureException } from "../../util/sentry";
import { ServiceAntenneForm } from "../ServiceAntenneForms";
import { UserContext } from "../UserContext";
import { CREATE_ANTENNE } from "./mutations";

const ServiceCreateAntenne = () => {
  const { service_members } = useContext(UserContext);
  const [currentUserService] = service_members;
  const { service_id } = currentUserService;

  const [createAntenne] = useMutation(CREATE_ANTENNE);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createAntenne({
        refetchQueries: ["service_antenne"],
        variables: {
          address: values.geocode.label,
          address_city: values.geocode.city,
          address_zip_code: values.geocode.postcode,
          contact_email: values.contact_email,
          contact_firstname: values.contact_firstname,
          contact_lastname: values.contact_lastname,
          contact_phone: values.contact_phone,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude,
          mesures_max: values.mesures_max,
          name: values.name,
          service_id: service_id,
        },
      });
    } catch (error) {
      captureException(error);
      // TODO(plaunay) display "Une erreur est survenue, veuillez réessayer plus tard."
    }

    setSubmitting(false);
    Router.push("/services/informations");
  };

  return (
    <Card p="5">
      <ServiceAntenneForm handleSubmit={handleSubmit} />
    </Card>
  );
};

export { ServiceCreateAntenne };
