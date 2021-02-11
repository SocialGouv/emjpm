import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { Box } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { Heading, Indicator } from "~/components";

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

  if (!useQueryReady(loading, error)) {
    return null;
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
    view_indicateur_inscrit,
    departements,
  } = data;
  const magistratInscritCount = view_indicateur_inscrit[0]?.count;
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
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={magistratInscritCount || 0}
        />
      </Box>
      <Heading size={2}>Connectés au cours des 30 derniers jours</Heading>
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
