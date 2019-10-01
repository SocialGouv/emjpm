import PropTypes from "prop-types";
import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Informations } from "../Informations";
import { GET_SERVICES_ANTENNE } from "./queries";

const ServicesInformations = props => {
  const { user_antennes, currentAntenne } = props;
  const [mainAntenne] = user_antennes;
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
  return <Informations {...props} service_antenne={service_antenne} />;
};

ServicesInformations.defaultProps = {
  user_antennes: [],
  currentAntenne: null
};

ServicesInformations.propTypes = {
  user_antennes: PropTypes.array,
  currentAntenne: PropTypes.string
};

export { ServicesInformations };
