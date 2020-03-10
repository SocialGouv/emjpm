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
    const [ti] = filterArray(array, "ti");
    return { service, prepose, individuel, ti };
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
      <Heading1 py="4">{`${department.code} - ${department.nom}`}</Heading1>
      <Box
        sx={{
          display: "grid",
          gridGap: 4,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(4, 1fr)"]
        }}
      >
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires inscrits"
          indicator={inscritData.service ? inscritData.service.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement inscrits"
          indicator={inscritData.prepose ? inscritData.prepose.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels inscrits"
          indicator={inscritData.individuel ? inscritData.individuel.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats inscrits"
          indicator={inscritData.ti ? inscritData.ti.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires connectés dans le dernier mois"
          indicator={loginData.service ? loginData.service.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement connectés dans le dernier mois"
          indicator={loginData.prepose ? loginData.prepose.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels connectés dans le dernier mois"
          indicator={loginData.individuel ? loginData.individuel.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats connectés dans le dernier mois"
          indicator={loginData.ti ? loginData.ti.count : 0}
        />
      </Box>
    </Box>
  );
};

export { IndicatorList };
