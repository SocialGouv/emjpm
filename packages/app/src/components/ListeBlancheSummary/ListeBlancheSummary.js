import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner, Text } from "@emjpm/ui";
import Link from "next/link";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { FiltersContext } from "../ListeBlancheFilter/context";
import { UserContext } from "../UserContext";
import { LB_SUMMARY } from "./queries";

const boxStyle = {
  // borderBottom: "1px solid",
  // borderBottomColor: "mediumGray",
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
  const { selectedDepartements, filterDepartement } = useContext(FiltersContext);
  const user = useContext(UserContext);

  const { data, error, loading } = useQuery(LB_SUMMARY, {
    variables: {
      departementIds: selectedDepartements.map((d) => d.id),
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
    individuel: {
      aggregate: { count: individuelCount },
    },
    prepose: {
      aggregate: { count: preposeCount },
    },
    individuel_finance: {
      aggregate: { count: individuelFinanceCount },
    },
    prepose_finance: {
      aggregate: { count: preposeFinanceCount },
    },
  } = data;

  return (
    <Card>
      <Flex>
        <Box width={1 / 2}>
          <Heading2>
            {!filterDepartement || filterDepartement.value === null
              ? "Tous les départements"
              : filterDepartement.label}
          </Heading2>
        </Box>
        <Box width={1 / 2} textAlign="right">
          <Link href={`/${user.type}/liste-blanche/ajout`}>{"Ajouter un enregistrement"}</Link>
        </Box>
      </Flex>

      <Flex flexDirection="column" pt={1}>
        <LabelValue
          label="Mandataire individuel"
          value={`${individuelCount} dont ${individuelFinanceCount} financés`}
        />
        <LabelValue
          label="Mandataire préposé à un établissement"
          value={`${preposeCount} dont ${preposeFinanceCount} financés`}
        />
      </Flex>
    </Card>
  );
};

export { ListeBlancheSummary };
