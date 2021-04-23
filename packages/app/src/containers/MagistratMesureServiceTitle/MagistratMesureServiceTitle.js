import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { Fragment } from "react";

import { Heading } from "~/components";
import useQueryReady from "~/hooks/useQueryReady";

import { SERVICE } from "./queries";

function MagistratMesureServiceTitle(props) {
  const { id } = props;
  const { data, loading, error } = useQuery(SERVICE, {
    variables: {
      id,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
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
    <>
      <Heading
        size={2}
        mb="1"
      >{`Réserver une mesure auprès de ${etablissement}`}</Heading>
      {limitReached && (
        <Heading size={4} color="error">
          {
            "Pour votre information, le mandataire a atteint le nombre de mesures souhaitées"
          }
        </Heading>
      )}
    </>
  );
}

MagistratMesureServiceTitle.propTypes = {
  id: PropTypes.number,
};

export default MagistratMesureServiceTitle;
