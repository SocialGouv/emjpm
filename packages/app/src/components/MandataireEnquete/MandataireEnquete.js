import { Card, Heading1 } from "@emjpm/ui";
import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";
import { useQuery } from "react-apollo";
import { Box } from "rebass";

import { UserContext } from "../../../src/components/UserContext";
import { MandataireEnqueteIndividuel } from "./MandataireEnqueteIndividuel";
import { ENQUETE } from "./queries";

export const MandataireEnquete = ({ id }) => {
  const { mandataire, type } = useContext(UserContext);

  const { data, loading } = useQuery(ENQUETE, {
    variables: { id }
  });

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  const { enquetes_by_pk: enquete } = data;
  if (!enquete) {
    return null;
  }

  return (
    <Fragment>
      <Heading1 mb={5}>Enquête {enquete.annee}</Heading1>
      <Card p={4}>
        {type === "individuel" && (
          <MandataireEnqueteIndividuel mandataireId={mandataire.id} enqueteId={id} />
        )}
      </Card>
    </Fragment>
  );
};

MandataireEnquete.propTypes = {
  id: PropTypes.number.isRequired
};

export default MandataireEnquete;
