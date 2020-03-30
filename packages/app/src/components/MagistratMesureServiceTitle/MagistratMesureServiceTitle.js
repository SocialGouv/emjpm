import { useQuery } from "@apollo/react-hooks";
import { Heading2 } from "@emjpm/ui";
import PropTypes from "prop-types";
import React from "react";

import { SERVICE } from "./queries";

const MagistratMesureServiceTitle = props => {
  const { id } = props;
  const { data, loading } = useQuery(SERVICE, {
    variables: {
      id
    }
  });

  if (loading) {
    return "Loading...";
  }

  const [service] = data.services;
  const { etablissement } = service;
  return <Heading2 mb="1">{`Réserver une mesure auprès de ${etablissement}`}</Heading2>;
};

MagistratMesureServiceTitle.propTypes = {
  id: PropTypes.string
};

export default MagistratMesureServiceTitle;
