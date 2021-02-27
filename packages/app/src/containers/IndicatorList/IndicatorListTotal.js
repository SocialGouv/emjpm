import { useQuery } from "@apollo/client";

import { Box } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { Heading, Indicator } from "~/components";

import { FRANCE_INDICATORS } from "./queries";
import { IndicatorBoxStyle } from "./style";

import use30DaysInterval from "~/hooks/use30DaysInterval";

function IndicatorListTotal() {
  const [currentMonthStart, currentMonthEnd] = use30DaysInterval();

  const { data, error, loading } = useQuery(FRANCE_INDICATORS, {
    variables: {
      currentMonthStart,
      currentMonthEnd,
    },
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
    mesuresLastMonthCount: {
      aggregate: { count: mesuresLastMonthCount },
    },
  } = data;
  return (
    <Box>
      <HeadingTitle py="4">{"France entière"}</HeadingTitle>
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
          title="France entière"
          indicator={mesuresLastMonthCount || 0}
        />
      </Box>
    </Box>
  );
}

export { IndicatorListTotal };
