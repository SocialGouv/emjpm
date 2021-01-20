import { useQuery } from "@apollo/client";

import { Box } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import { Card, Heading2, Heading4, Indicator, Spinner } from "~/ui";

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
      aggregate: {
        sum: { count: serviceInscritCount },
      },
    },
    individuelInscritCount: {
      aggregate: {
        sum: { count: individuelInscritCount },
      },
    },
    preposeInscritCount: {
      aggregate: {
        sum: { count: preposeInscritCount },
      },
    },
    magistratInscritCount: {
      aggregate: {
        sum: { count: magistratInscritCount },
      },
    },
    mesuresLastMonthCount: {
      aggregate: { count: mesuresLastMonthCount },
    },
  } = data;
  return (
    <Box>
      <HeadingTitle py="4">{"France entière"}</HeadingTitle>
      <Heading2>Inscrits</Heading2>
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
      <Heading2>Connectés dans le dernier mois</Heading2>
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
      <Heading2>Mesures réservées dans le dernier mois</Heading2>
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
