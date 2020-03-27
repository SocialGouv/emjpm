import { useQuery } from "@apollo/react-hooks";
import { Heading2 } from "@emjpm/ui";
import PropTypes from "prop-types";
import React from "react";

import { MANDATAIRE } from "./queries";

const MagistratMesureServiceTitle = props => {
  const { id } = props;

  const { data, loading } = useQuery(MANDATAIRE, {
    variables: {
      id
    }
  });

  if (loading) {
    return "Loading...";
  }

  const [mandataire] = data.mandataires;
  const { user } = mandataire;
  const { prenom, nom } = user;
  return <Heading2 mb="1">{`Réserver une mesure auprès de ${prenom} ${nom}`}</Heading2>;
};

MagistratMesureServiceTitle.propTypes = {
  id: PropTypes.string
};

export default MagistratMesureServiceTitle;
