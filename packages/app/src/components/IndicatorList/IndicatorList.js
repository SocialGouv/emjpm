import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@socialgouv/emjpm-ui-components";
import { Card, Heading1, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { INDICATORS } from "./queries";
import { IndicatorListStyle } from "./style";

const filterArray = (array, type) => array.filter(element => element.type === type);
const filterArrays = arrays => {
  return arrays.map(array => {
    const [service] = filterArray(array, "service");
    const [prepose] = filterArray(array, "prepose");
    const [individuel] = filterArray(array, "individuel");
    return { service, prepose, individuel };
  });
};

const IndicatorList = props => {
  const { departementCode } = props;
  const { data, error, loading } = useQuery(INDICATORS, {
    variables: { code: departementCode }
  });

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const { view_indicateur_login: login, view_indicateur_inscrit: inscrit, departements } = data;
  const [department] = departements;
  const [loginData, inscritData] = filterArrays([login, inscrit]);

  return (
    <Box sx={IndicatorListStyle} {...props}>
      <Heading1 py="4">{`Indicateurs de suivi: ${department.nom}`}</Heading1>
      <Box
        sx={{
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(3, 1fr)"]
        }}
      >
        <Indicator
          error={false}
          loading={false}
          title="Inscrit service"
          indicator={inscritData.service ? inscritData.service.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Inscrit préposé"
          indicator={inscritData.prepose ? inscritData.prepose.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Inscrit individuel"
          indicator={inscritData.individuel ? inscritData.individuel.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Connections service"
          indicator={loginData.service ? loginData.service.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Connections préposé"
          indicator={loginData.prepose ? loginData.prepose.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Connections individuel"
          indicator={loginData.individuel ? loginData.individuel.count : 0}
        />
      </Box>
    </Box>
  );
};

export { IndicatorList };
