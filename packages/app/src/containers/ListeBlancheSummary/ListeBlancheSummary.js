import { useQuery } from "@apollo/client";
import { findDepartementByCodeOrId } from "@emjpm/biz";
import { useContext, useMemo } from "react";
import { Box, Flex } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { Card, Heading, SrOnly, Text } from "~/components";
import { useDepartements } from "~/utils/departements/useDepartements.hook";

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

function ListeBlancheSummary() {
  const { filters } = useContext(FiltersContextSerializable);
  const { departement } = filters;

  const { data, error, loading } = useQuery(LB_SUMMARY, {
    variables: {
      departementCode: departement,
    },
  });

  const { departements } = useDepartements({ all: true });

  const departementLabel = useMemo(() => {
    if (!departement || !departements?.length) {
      return "Tous les départements";
    } else {
      const { nom = "" } = findDepartementByCodeOrId(departements, {
        id: departement,
      });
      return nom;
    }
  }, [departements, departement]);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const {
    individuel: {
      aggregate: { count: individuelCount },
    },
    prepose: {
      aggregate: { count: preposeCount },
    },
    individuel_finance_departement: {
      aggregate: { count: individuelFinanceDepartementCount },
    },
    service: {
      aggregate: { count: serviceCount },
    },
    dpfi: {
      aggregate: { count: dpfiCount },
    },
    sdpf: {
      aggregate: { count: sdpfCount },
    },
    dpfi_finance_departement: {
      aggregate: { count: dpfiFinanceDepartementCount },
    },
  } = data;

  const resultCount =
    Number(individuelCount) +
    Number(preposeCount) +
    Number(individuelFinanceDepartementCount) +
    Number(serviceCount) +
    Number(dpfiCount) +
    Number(sdpfCount);

  return (
    <>
      <SrOnly role="status">
        {resultCount === 0
          ? "Pas de donnée à afficher"
          : `${resultCount} résultats`}{" "}
      </SrOnly>
      <Card tabIndex="0">
        <Flex>
          <Box width={1 / 2}>
            <Heading size={2}>{departementLabel}</Heading>
          </Box>
        </Flex>

        <Flex flexDirection="column" pt={1}>
          <LabelValue
            label="Mandataire individuel"
            value={
              `${individuelCount}` +
              (!departement
                ? ""
                : " dont " + individuelFinanceDepartementCount + " financés")
            }
          />
          <LabelValue
            label="Mandataire préposé à un établissement"
            value={`${preposeCount}`}
          />
          <LabelValue label="Services mandataires" value={`${serviceCount}`} />
          <LabelValue
            label="DPF individuel"
            value={
              `${dpfiCount}` +
              (!departement
                ? ""
                : " dont " + dpfiFinanceDepartementCount + " financés")
            }
          />

          <LabelValue label="Services DPF" value={`${sdpfCount}`} />
        </Flex>
      </Card>
    </>
  );
}

export { ListeBlancheSummary };
