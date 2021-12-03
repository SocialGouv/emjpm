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
    context: { headers: { "X-Hasura-Role": "anonymous" } },
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
    greffierLoginCount: {
      aggregate: {
        sum: { count: greffierLoginCount },
      },
    },
    directionLoginCount: {
      aggregate: {
        sum: { count: directionLoginCount },
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
    greffierInscritCount: {
      aggregate: {
        sum: { count: greffierInscritCount },
      },
    },
    directionInscritCount: {
      aggregate: {
        sum: { count: directionInscritCount },
      },
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
          title="Magistrats"
          indicator={magistratInscritCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Greffier"
          indicator={greffierInscritCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Agents DD/DR"
          indicator={directionInscritCount || 0}
          headingSize={5}
        />
      </Box>
      <Box my={4} sx={IndicatorBoxStyle}>
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
      </Box>
      <Heading size={2}>Connectés au cours des 30 derniers jours</Heading>
      <Box my={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={magistratLoginCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Greffiers"
          indicator={greffierLoginCount || 0}
          headingSize={5}
        />
        <Indicator
          error={false}
          loading={false}
          title="Agents DD/DR"
          indicator={directionLoginCount || 0}
          headingSize={5}
        />
      </Box>
      <Box my={4} sx={IndicatorBoxStyle}>
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
          headingSize={5}
        />
      </Box>
      Seules les mesures dont le département du majeur est renseigné sont prises
      en compte
    </Box>
  );
}

export { IndicatorList };
