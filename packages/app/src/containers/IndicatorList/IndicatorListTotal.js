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
    context: { headers: { "X-Hasura-Role": "anonymous" } },
    variables: {
      currentMonthStart,
      currentMonthEnd,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const {
    serviceLoginCount: [{ count: serviceLoginCount }],
    individuelLoginCount: [{ count: individuelLoginCount }],
    preposeLoginCount: [{ count: preposeLoginCount }],
    magistratLoginCount: [{ count: magistratLoginCount }],
    directionLoginCount: [{ count: directionLoginCount }],
    serviceInscritCount: [{ count: serviceInscritCount }],
    individuelInscritCount: [{ count: individuelInscritCount }],
    preposeInscritCount: [{ count: preposeInscritCount }],
    magistratInscritCount: [{ count: magistratInscritCount }],
    directionInscritCount: [{ count: directionInscritCount }],
    mesuresLastMonthCount: {
      aggregate: { count: mesuresLastMonthCount },
    },
  } = data;

  console.log(data);
  return (
    <Box>
      <HeadingTitle py="4">{"France entière"}</HeadingTitle>
      <Heading size={2}>Inscrits</Heading>
      <Box mt={2} mb={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Agents DD/DR/DN"
          indicator={directionInscritCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires"
          indicator={serviceInscritCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={preposeInscritCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={individuelInscritCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={magistratInscritCount || 0}
          headingSize={5}
        />
      </Box>
      <Heading size={2}>Connectés au cours des 30 derniers jours</Heading>
      <Box mt={2} mb={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Agents DD/DR/DN"
          indicator={directionLoginCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires"
          indicator={serviceLoginCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={preposeLoginCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={individuelLoginCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={magistratLoginCount || 0}
          headingSize={5}
        />
      </Box>
      <Heading size={2}>
        Mesures réservées au cours des 30 derniers jours
      </Heading>
      <Box mt={2} mb={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="France entière"
          indicator={mesuresLastMonthCount || 0}
          headingSize={5}
        />
      </Box>
    </Box>
  );
}

export { IndicatorListTotal };
