import { useQuery } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import React from "react";

import { Informations } from "../Informations";
import { GET_SERVICES_ANTENNE } from "./queries";

// TODO MOVE ME IN UTILS
export const getHeadquarter = user_antennes => {
  return user_antennes.filter(user_antenne => user_antenne.service_antenne.headquarters === true);
};

const ServicesInformations = props => {
  const { user_antennes, currentAntenne } = props;
  const [mainAntenne] = user_antennes;
  const antennes = getHeadquarter(user_antennes);
  const [headquarter] = antennes;
  const currentAntenneId = currentAntenne || headquarter.service_antenne.id;
  const { data, error, loading } = useQuery(GET_SERVICES_ANTENNE, {
    variables: {
      antenneId: currentAntenne ? currentAntenne : mainAntenne.antenne_id
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { service_antenne } = data;
  return (
    <Informations {...props} service_antenne={service_antenne} currentAntenne={currentAntenneId} />
  );
};

ServicesInformations.defaultProps = {
  currentAntenne: null,
  user_antennes: []
};

ServicesInformations.propTypes = {
  currentAntenne: PropTypes.string,
  user_antennes: PropTypes.array
};

export { ServicesInformations };
