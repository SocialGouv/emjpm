import { useQuery } from "@apollo/react-hooks";
import { Heading2, Heading4 } from "@emjpm/ui";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Box } from "rebass";

import { MANDATAIRE } from "./queries";

const MagistratMesureMandataireTitle = (props) => {
  const { id } = props;

  const { data, loading } = useQuery(MANDATAIRE, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <Box p={1}>{"Chargement..."}</Box>;
  }

  const [mandataire] = data.mandataires;
  const { user, dispo_max, mesures_en_cours, mesures_en_attente } = mandataire;
  const { prenom, nom } = user;
  const limitReached = mesures_en_cours + mesures_en_attente >= dispo_max;

  return (
    <Fragment>
      <Heading2 mb="1">{`Réserver une mesure auprès de ${prenom} ${nom}`}</Heading2>
      {limitReached && (
        <Heading4 color="error">{`Pour votre information, le mandataire a atteint le nombre de mesures souhaitées`}</Heading4>
      )}
    </Fragment>
  );
};

MagistratMesureMandataireTitle.propTypes = {
  id: PropTypes.number,
};

export default MagistratMesureMandataireTitle;
