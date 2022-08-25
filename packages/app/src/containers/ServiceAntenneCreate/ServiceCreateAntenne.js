import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { ServiceAntenneForm } from "~/containers/ServiceAntenneForms";
import { Card } from "~/components";
import { captureException } from "~/user/sentry";

import { CREATE_ANTENNE } from "./mutations";
import useQueryReady from "~/hooks/useQueryReady";
import useUser from "~/hooks/useUser";

function ServiceCreateAntenne() {
  const history = useHistory();

  const user = useUser();
  const { service } = user;

  // const [{ service }] = service_members;
  const { service_antennes } = service;

  const otherAntennesMesuresMaxSum = service_antennes.reduce(
    (acc, s) => acc + (s.mesures_max || 0),
    0
  );
  const mesuresMax = service.dispo_max;

  const [createAntenne, { loading, error }] = useMutation(CREATE_ANTENNE);
  useQueryReady(loading, error);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);

    try {
      await createAntenne({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          serviceId: service.id,
          adresse: values.geocode.label,
          code_postal: values.geocode.postcode,
          departement_code: values.geocode.depcode,
          contact_email: values.contact_email,
          contact_firstname: values.contact_firstname,
          contact_lastname: values.contact_lastname,
          contact_phone: values.contact_phone,
          latitude: values.geocode.latitude,
          longitude: values.geocode.longitude,
          mesures_max: values.mesures_max,
          name: values.name,
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
    <Card p="5" id="service_create_antenne">
      <ServiceAntenneForm
        handleSubmit={handleSubmit}
        mesuresMax={mesuresMax}
        otherAntennesMesuresMaxSum={otherAntennesMesuresMaxSum}
      />
    </Card>
  );
}

export { ServiceCreateAntenne };
