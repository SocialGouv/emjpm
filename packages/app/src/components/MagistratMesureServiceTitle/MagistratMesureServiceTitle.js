import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { Box } from "rebass";

import { Heading2, Heading4 } from "~/ui";

import { SERVICE } from "./queries";

function MagistratMesureServiceTitle(props) {
  const { id } = props;
  const { data, loading } = useQuery(SERVICE, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <Box p={1}>{"Chargement..."}</Box>;
  }

  const [service] = data.services;
  const {
    etablissement,
    dispo_max,
    mesures_awaiting,
    mesures_in_progress,
  } = service;
  const limitReached = mesures_in_progress + mesures_awaiting >= dispo_max;

  return (
    <Fragment>
      <Heading2 mb="1">{`Réserver une mesure auprès de ${etablissement}`}</Heading2>
      {limitReached && (
        <Heading4 color="error">
          {
            "Pour votre information, le mandataire a atteint le nombre de mesures souhaitées"
          }
        </Heading4>
      )}
    </Fragment>
  );
}

MagistratMesureServiceTitle.propTypes = {
  id: PropTypes.number,
};

export default MagistratMesureServiceTitle;
