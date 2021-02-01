import { useQuery } from "@apollo/client";

import { Box } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { Card, Heading2, Heading4, Indicator, Spinner } from "~/ui";

import use30DaysInterval from "~/hooks/use30DaysInterval";

import { INDICATORS } from "./queries";
import { IndicatorBoxStyle, IndicatorListStyle } from "./style";

const filterArray = (array, type) =>
  array.filter((element) => element.type === type);

function filterArrays(arrays) {
  return arrays.map((array) => {
    const [service] = filterArray(array, "service");
    const [prepose] = filterArray(array, "prepose");
    const [individuel] = filterArray(array, "individuel");
    const [ti] = filterArray(array, "ti");
    return { individuel, prepose, service, ti };
  });
}

function IndicatorList(props) {
  const { departementCode } = props;
  const [currentMonthStart, currentMonthEnd] = use30DaysInterval();
  const { data, error, loading } = useQuery(INDICATORS, {
    variables: { code: departementCode, currentMonthStart, currentMonthEnd },
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
    departements,
  } = data;
  const [department] = departements;
  const [loginData, inscritData] = filterArrays([login, inscrit]);

  return (
    <Box sx={IndicatorListStyle} {...props}>
      <HeadingTitle py="4">{`${department.code} - ${department.nom}`}</HeadingTitle>
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
          indicator={loginData.service?.count || 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={loginData.prepose?.count || 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={loginData.individuel?.count || 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={loginData.ti?.count || 0}
        />
      </Box>
      <Heading2>Mesures réservées au cours des 30 derniers jours</Heading2>
      <Box my={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Pour le département"
          indicator={data.mesuresLastMonthCount?.aggregate?.count || 0}
        />
      </Box>
      Seules les mesures dont le département du majeur est renseigné sont prises
      en compte
    </Box>
  );
}

export { IndicatorList };
