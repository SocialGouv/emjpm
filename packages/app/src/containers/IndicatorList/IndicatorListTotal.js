import { useQuery } from "@apollo/client";

import { Box } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { Heading, Indicator } from "~/components";

import { FRANCE_INDICATORS } from "./queries";
import { IndicatorBoxStyle } from "./style";

import use30DaysInterval from "~/hooks/use30DaysInterval";

const headingSize = 5;

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
    mesuresLastMonthCount: {
      aggregate: { count: mesuresLastMonthCount },
    },
  } = data;

  const serviceLoginCount = data.serviceLoginCount[0]?.count;
  const individuelLoginCount = data.individuelLoginCount[0]?.count;
  const preposeLoginCount = data.preposeLoginCount[0]?.count;
  const magistratLoginCount = data.magistratLoginCount[0]?.count;
  const greffierLoginCount = data.greffierLoginCount[0]?.count;
  const directionLoginCount = data.directionLoginCount[0]?.count;
  const dpfiLoginCount = data.dpfilLoginCount[0]?.count;
  const sdpfLoginCount = data.sdpfLoginCount[0]?.count;
  const serviceInscritCount = data.serviceInscritCount[0]?.count;
  const individuelInscritCount = data.individuelInscritCount[0]?.count;
  const preposeInscritCount = data.preposeInscritCount[0]?.count;
  const magistratInscritCount = data.magistratInscritCount[0]?.count;
  const greffierInscritCount = data.greffierInscritCount[0]?.count;
  const directionInscritCount = data.directionInscritCount[0]?.count;
  const dpfiInscritCount = data.dpfiInscritCount[0]?.count;
  const sdpfInscritCount = data.sdpfInscritCount[0]?.count;

  return (
    <Box>
      <HeadingTitle py="4">{"France entière"}</HeadingTitle>
      <Heading size={2}>Inscrits</Heading>
      <Box mt={2} mb={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Magistrats"
          indicator={magistratInscritCount || 0}
          headingSize={headingSize}
        />
        <Indicator
          error={false}
          loading={false}
          title="Greffiers"
          indicator={greffierInscritCount || 0}
          headingSize={headingSize}
        />
        <Indicator
          error={false}
          loading={false}
          title="Agents DD/DR/DN"
          indicator={directionInscritCount || 0}
          headingSize={headingSize}
        />
      </Box>
      <Box mt={2} mb={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires"
          indicator={serviceInscritCount || 0}
          headingSize={headingSize}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={preposeInscritCount || 0}
          headingSize={headingSize}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={individuelInscritCount || 0}
          headingSize={headingSize}
        />
      </Box>
      <Box mt={2} mb={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Mandataires DPF"
          indicator={dpfiInscritCount || 0}
          headingSize={headingSize}
        />
        <Indicator
          error={false}
          loading={false}
          title="Services DPF"
          indicator={sdpfInscritCount || 0}
          headingSize={headingSize}
        />
      </Box>
      <Heading size={2}>Connectés au cours des 30 derniers jours</Heading>
      <Box mt={2} mb={4} sx={IndicatorBoxStyle}>
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
          title="Agents DD/DR/DN"
          indicator={directionLoginCount || 0}
          headingSize={headingSize}
        />
      </Box>
      <Box mt={2} mb={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Services mandataires"
          indicator={serviceLoginCount || 0}
          headingSize={headingSize}
        />
        <Indicator
          error={false}
          loading={false}
          title="Préposés à un établissement"
          indicator={preposeLoginCount || 0}
          headingSize={headingSize}
        />
        <Indicator
          error={false}
          loading={false}
          title="Mandataires individuels"
          indicator={individuelLoginCount || 0}
          headingSize={headingSize}
        />
      </Box>
      <Box mt={2} mb={4} sx={IndicatorBoxStyle}>
        <Indicator
          error={false}
          loading={false}
          title="Mandataires DPF"
          indicator={dpfiLoginCount || 0}
          headingSize={headingSize}
        />
        <Indicator
          error={false}
          loading={false}
          title="Services DPF"
          indicator={sdpfLoginCount || 0}
          headingSize={headingSize}
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
          headingSize={headingSize}
        />
      </Box>
    </Box>
  );
}

export { IndicatorListTotal };
