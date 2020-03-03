import { useQuery } from "@apollo/react-hooks";
import { Indicator } from "@socialgouv/emjpm-ui-components";
import { Card, Heading1, Heading4, Spinner } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { FRANCE_INDICATORS } from "./queries";

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
        sum: { count: serviceLoginCount }
      }
    },
    individuelLoginCount: {
      aggregate: {
        sum: { count: individuelLoginCount }
      }
    },
    preposeLoginCount: {
      aggregate: {
        sum: { count: preposeLoginCount }
      }
    },
    serviceInscritCount: {
      aggregate: {
        sum: { count: serviceInscritCount }
      }
    },
    individuelInscritCount: {
      aggregate: {
        sum: { count: individuelInscritCount }
      }
    },
    preposeInscritCount: {
      aggregate: {
        sum: { count: preposeInscritCount }
      }
    }
  } = data;
  return (
    <Box>
      <Heading1 py="4">{`France entière`}</Heading1>
      <Box
        sx={{
          display: "grid",
          gridGap: 3,
          gridTemplateColumns: ["repeat(1, 1fr)", "repeat(3, 1fr)"]
        }}
      >
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires inscrits"
          indicator={serviceInscritCount ? serviceInscritCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement inscrits"
          indicator={preposeInscritCount ? preposeInscritCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels inscrits"
          indicator={individuelInscritCount ? individuelInscritCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires connectés dans le dernier mois"
          indicator={serviceLoginCount ? serviceLoginCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement connectés dans le dernier mois"
          indicator={preposeLoginCount ? preposeLoginCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels connectés dans le dernier mois"
          indicator={individuelLoginCount ? individuelLoginCount : 0}
        />
      </Box>
    </Box>
  );
};

export { IndicatorListTotal };
