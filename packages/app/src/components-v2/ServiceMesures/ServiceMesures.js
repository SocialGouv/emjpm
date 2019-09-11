import React from "react";
import { Box } from "rebass";
import { useQuery } from "@apollo/react-hooks";

import { ServiceMesuresStyle } from "./style";
import { MESURES } from "./queries";

const ServiceMesures = props => {
  const {
    currentUser: { user_antennes }
  } = props;
  const [mainAntenne] = user_antennes;

  const { data, error, loading } = useQuery(MESURES, {
    variables: {
      antenneId: mainAntenne.antenne_id
    }
  });
  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  console.log(data);
  return <Box sx={ServiceMesuresStyle} {...props} />;
};

export { ServiceMesures };
