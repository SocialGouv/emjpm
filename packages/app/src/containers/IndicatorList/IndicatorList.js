import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { Box } from "rebass";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { Card, Heading, Indicator, Spinner } from "~/components";

import use30DaysInterval from "~/hooks/use30DaysInterval";

import { INDICATORS } from "./queries";
import { IndicatorBoxStyle, IndicatorListStyle } from "./style";

function IndicatorList(props) {
  const { departementCode } = props;
  const [currentMonthStart, currentMonthEnd] = use30DaysInterval();
  const { data, error, loading } = useQuery(INDICATORS, {
    variables: { code: departementCode, currentMonthStart, currentMonthEnd },
  });

  const view_indicateur_login = data?.view_indicateur_login;
  const loginData = useMemo(() => {
    if (!view_indicateur_login) return;
    const [service] = view_indicateur_login.filter(
      ({ type }) => type === "service"
    );
    const [prepose] = view_indicateur_login.filter(
      ({ type }) => type === "prepose"
    );
    const [individuel] = view_indicateur_login.filter(
      ({ type }) => type === "individuel"
    );
    const [ti] = view_indicateur_login.filter(({ type }) => type === "ti");
    return { individuel, prepose, service, ti };
  }, [view_indicateur_login]);

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
        <Heading size={4}>erreur</Heading>
      </Card>
    );
  }

  const {
    serviceInscritCount: {
      aggregate: { count: serviceInscritCount },
    },
    individuelInscritCount: {
      aggregate: { count: individuelInscritCount },
    },
    preposeInscritCount: {
      aggregate: { count: preposeInscritCount },
    },
    departements,
  } = data;
  const [department] = departements;

  return (
    <Box sx={IndicatorListStyle} {...props}>
      <HeadingTitle py="4">{`${department.id} - ${department.nom}`}</HeadingTitle>
      <Heading size={2}>Inscrits</Heading>
      <Box my={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires"
          indicator={serviceInscritCount || 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={preposeInscritCount || 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={individuelInscritCount || 0}
        />
        {/* <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={inscritData.ti ? inscritData.ti.count : 0}
        /> */}
      </Box>
      <Heading size={2}>Connectés dans le dernier mois</Heading>
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
      <Heading size={2}>
        Mesures réservées au cours des 30 derniers jours
      </Heading>
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
