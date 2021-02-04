import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { Box } from "rebass";

import { Heading } from "~/ui";

import { MANDATAIRE } from "./queries";

function MagistratMesureMandataireTitle(props) {
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
      <Heading
        size={2}
        mb="1"
      >{`Réserver une mesure auprès de ${prenom} ${nom}`}</Heading>
      {limitReached && (
        <Heading size={4} color="error">
          {
            "Pour votre information, le mandataire a atteint le nombre de mesures souhaitées"
          }
        </Heading>
      )}
    </Fragment>
  );
}

MagistratMesureMandataireTitle.propTypes = {
  id: PropTypes.number,
};

export default MagistratMesureMandataireTitle;
