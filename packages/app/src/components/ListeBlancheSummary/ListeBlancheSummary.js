import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner, Text } from "@emjpm/ui";
import React, { useContext, useMemo } from "react";
import { Box, Flex } from "rebass";

import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { LB_SUMMARY } from "./queries";

const boxStyle = {
  mb: "1",
};

const labelStyle = {
  color: "mediumGray",
  fontFamily: "body",
  fontSize: "12px",
  fontWeight: "700",
};

const valueStyle = {
  fontFamily: "heading",
  fontSize: "13px",
  fontWeight: "600",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const LabelValue = ({ label, value }) => (
  <Flex sx={boxStyle}>
    <Box width="30%">
      <Text sx={labelStyle}>{label}</Text>
    </Box>
    <Text sx={valueStyle}>{value}</Text>
  </Flex>
);

const ListeBlancheSummary = () => {
  const { filters, departements = [] } = useContext(FiltersContextSerializable);
  const { departement } = filters;

  const { data, error, loading } = useQuery(LB_SUMMARY, {
    variables: {
      departementIds: departement ? [departement] : departements.map((d) => d.id),
    },
  });

  const departementLabel = useMemo(() => {
    if (!departement || departement === null || !departements) {
      return "Tous les départements";
    } else {
      const { nom = "" } = departements.find((d) => d.id === departement);
      return nom;
    }
  }, [departements, departement]);

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
        <Heading4>Une erreur est survenue, veuillez réessayer plus tard.</Heading4>
      </Card>
    );
  }

  const {
    individuel: {
      aggregate: { count: individuelCount },
    },
    prepose: {
      aggregate: { count: preposeCount },
    },
    individuel_finance: {
      aggregate: { count: individuelFinanceCount },
    },
    prepose_rattache: {
      aggregate: { count: preposeRattacheCount },
    },
    service: {
      aggregate: { count: serviceCount },
    },
  } = data;

  return (
    <Card>
      <Flex>
        <Box width={1 / 2}>
          <Heading2>{departementLabel}</Heading2>
        </Box>
      </Flex>

      <Flex flexDirection="column" pt={1}>
        <LabelValue
          label="Mandataire individuel"
          value={`${individuelCount} dont ${individuelFinanceCount} financés`}
        />
        <LabelValue
          label="Mandataire préposé à un établissement"
          value={`${preposeCount} dont ${preposeRattacheCount} rattachés`}
        />
        <LabelValue label="Services" value={`${serviceCount}`} />
      </Flex>
    </Card>
  );
};

export { ListeBlancheSummary };
