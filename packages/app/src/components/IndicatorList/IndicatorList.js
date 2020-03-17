import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@socialgouv/emjpm-ui-components";
import { Card, Heading1, Heading2, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { formatSatisfactionPourcent } from "./helpers";
import { INDICATORS } from "./queries";
import { IndicatorBoxStyle, IndicatorListStyle } from "./style";

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

  const {
    view_indicateur_login: login,
    view_indicateur_inscrit: inscrit,
    view_indicateur_satisfaction_campaign: satisfaction,
    departements
  } = data;
  const [department] = departements;
  const [loginData, inscritData, satisfactionData] = filterArrays([login, inscrit, satisfaction]);

  return (
    <Box sx={IndicatorListStyle} {...props}>
      <Heading1 py="4">{`${department.code} - ${department.nom}`}</Heading1>
      <Heading2>Inscrits</Heading2>
      <Box my={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires"
          indicator={inscritData.service ? inscritData.service.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={inscritData.prepose ? inscritData.prepose.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={inscritData.individuel ? inscritData.individuel.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={inscritData.ti ? inscritData.ti.count : 0}
        />
      </Box>
      <Heading2>Connectés dans le dernier mois</Heading2>
      <Box my={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires"
          indicator={loginData.service ? loginData.service.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={loginData.prepose ? loginData.prepose.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={loginData.individuel ? loginData.individuel.count : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={loginData.ti ? loginData.ti.count : 0}
        />
      </Box>
      <Heading2>Satisfaction</Heading2>
      <Box my={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires"
          indicator={formatSatisfactionPourcent(
            satisfactionData.service ? satisfactionData.service.value : undefined
          )}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={formatSatisfactionPourcent(
            satisfactionData.prepose ? satisfactionData.prepose.value : undefined
          )}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={formatSatisfactionPourcent(
            satisfactionData.individuel ? satisfactionData.individuel.value : undefined
          )}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={formatSatisfactionPourcent(
            satisfactionData.ti ? satisfactionData.ti.value : undefined
          )}
        />
      </Box>
    </Box>
  );
};

export { IndicatorList };
