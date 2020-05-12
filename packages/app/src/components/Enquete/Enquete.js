import Error from "next/error";
import PropTypes from "prop-types";
import React, { Fragment, useContext } from "react";
import { useQuery } from "react-apollo";
import { Box } from "rebass";

import { UserContext } from "../../../src/components/UserContext";
import { EnqueteIndividuel } from "./EnqueteIndividuel";
import { ENQUETE } from "./queries";

export const Enquete = ({ id }) => {
  const { mandataire, type } = useContext(UserContext);

  const { data, loading } = useQuery(ENQUETE, {
    variables: { id }
  });

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  const { enquetes_by_pk: enquete } = data;
  if (!enquete) {
    return <Error code={404} />;
  }

  return (
    <Fragment>
      {type === "individuel" && <EnqueteIndividuel mandataireId={mandataire.id} enqueteId={id} />}
    </Fragment>
  );
};

Enquete.propTypes = {
  id: PropTypes.number.isRequired
};

export default Enquete;
