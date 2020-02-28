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
  console.log(data);
  const {
    serviceLoginCount: {
      aggregate: { count: serviceLoginCount }
    },
    individuelLoginCount: {
      aggregate: { count: individuelLoginCount }
    },
    preposeLoginCount: {
      aggregate: { count: preposeLoginCount }
    },
    serviceInscritCount: {
      aggregate: { count: serviceInscritCount }
    },
    individuelInscritCount: {
      aggregate: { count: individuelInscritCount }
    },
    preposeInscritCount: {
      aggregate: { count: preposeInscritCount }
    }
  } = data;
  return (
    <Box>
      <Heading1 py="4">{`Indicateurs de suivi: France`}</Heading1>
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
          title="Inscrit service"
          indicator={serviceInscritCount ? serviceInscritCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Inscrit préposé"
          indicator={preposeInscritCount ? preposeInscritCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Inscrit individuel"
          indicator={individuelInscritCount ? individuelInscritCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Connections service"
          indicator={serviceLoginCount ? serviceLoginCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Connections préposé"
          indicator={preposeLoginCount ? preposeLoginCount : 0}
        />
        <Indicator
          error={false}
          loading={false}
          title="Connections individuel"
          indicator={individuelLoginCount ? individuelLoginCount : 0}
        />
      </Box>
    </Box>
  );
};

export { IndicatorListTotal };
