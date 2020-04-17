import { Card, Heading1 } from "@emjpm/ui";
import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";
import { useMutation, useQuery } from "react-apollo";
import { Box } from "rebass";

import { UserContext } from "../../../src/components/UserContext";
import { CREATE_ENQUETE_SERVICES } from "./mutations";
import { ENQUETE } from "./queries";
import { ServiceEnqueteForm } from "./ServiceEnqueteForm";

export const ServiceEnquete = ({ id }) => {
  const {
    service_members: [{ service }]
  } = useContext(UserContext);

  const [createEnqueteServices] = useMutation(CREATE_ENQUETE_SERVICES);
  const { data, loading } = useQuery(ENQUETE, {
    variables: { enqueteId: id, serviceId: service.id }
  });

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  const { enquetes_by_pk: enquete, enquete_reponses } = data;
  if (!enquete) {
    return null;
  }

  const [response] = enquete_reponses;
  console.log("response", response);

  return (
    <Fragment>
      <Heading1 mb={5}>Enquête {enquete.annee}</Heading1>
      <Card p={4}>
        <ServiceEnqueteForm
          handleSubmit={async () => {
            await createEnqueteServices({
              variables: {
                enqueteId: id
              }
            });
          }}
          enqueteServices={{}}
        />
      </Card>
    </Fragment>
  );
};

ServiceEnquete.propTypes = {
  id: PropTypes.number.isRequired
};

export default ServiceEnquete;
