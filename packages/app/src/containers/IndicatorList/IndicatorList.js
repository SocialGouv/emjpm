import { useQuery } from "@apollo/client";

import { Box } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { Heading, Indicator } from "~/components";

import use30DaysInterval from "~/hooks/use30DaysInterval";

import { INDICATORS } from "./queries";
import { IndicatorBoxStyle, IndicatorListStyle } from "./style";

import { getDepartementName } from "~/utils/geodata";

function IndicatorList(props) {
  const { departementCode } = props;
  const [currentMonthStart, currentMonthEnd] = use30DaysInterval();
  const { data, error, loading } = useQuery(INDICATORS, {
    variables: { code: departementCode, currentMonthStart, currentMonthEnd },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const {
    serviceLoginCount: {
      aggregate: {
        sum: { count: serviceLoginCount },
      },
    },
    individuelLoginCount: {
      aggregate: {
        sum: { count: individuelLoginCount },
      },
    },
    preposeLoginCount: {
      aggregate: {
        sum: { count: preposeLoginCount },
      },
    },
    magistratLoginCount: {
      aggregate: {
        sum: { count: magistratLoginCount },
      },
    },
    serviceInscritCount: {
      aggregate: { count: serviceInscritCount },
    },
    individuelInscritCount: {
      aggregate: { count: individuelInscritCount },
    },
    preposeInscritCount: {
      aggregate: { count: preposeInscritCount },
    },
    magistratInscritCount: {
      aggregate: { count: magistratInscritCount },
    },
  } = data;

  const departementNom = getDepartementName(departementCode);

  return (
    <Box sx={IndicatorListStyle} {...props}>
      <HeadingTitle py="4">{`${departementCode} - ${departementNom}`}</HeadingTitle>
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
          indicator={serviceLoginCount || 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={preposeLoginCount || 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={individuelLoginCount || 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={magistratLoginCount || 0}
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
