import { useQuery } from "@apollo/react-hooks";
import {
  Card,
  Heading1,
  Heading2,
  Heading4,
  Indicator,
  Spinner,
} from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

import { FRANCE_INDICATORS } from "./queries";
import { IndicatorBoxStyle } from "./style";

const IndicatorListTotal = () => {
  const { data, error, loading } = useQuery(FRANCE_INDICATORS);

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
  } = data;
  return (
    <Box>
      <Heading1 py="4">{`France entière`}</Heading1>
      <Heading2>Inscrits</Heading2>
      <Box my={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires"
          indicator={serviceInscritCount ? serviceInscritCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={preposeInscritCount ? preposeInscritCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={individuelInscritCount ? individuelInscritCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={magistratInscritCount ? magistratInscritCount : 0}
        />
      </Box>
      <Heading2>Connectés dans le dernier mois</Heading2>
      <Box my={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires"
          indicator={serviceLoginCount ? serviceLoginCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={preposeLoginCount ? preposeLoginCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={individuelLoginCount ? individuelLoginCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={magistratLoginCount ? magistratLoginCount : 0}
        />
      </Box>
    </Box>
  );
};

export { IndicatorListTotal };
