import { Fragment, useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Flex, Text } from "rebass";

import { AdminFilterContext } from "~/containers/AdminFilterBar/context";
import { Link } from "~/components/Link";
import { PaginatedList } from "~/containers/PaginatedList";
import { Button, Card } from "~/components";

import useQueryReady from "~/hooks/useQueryReady";
import useEffectObjectValuesChangeCallback from "~/hooks/useEffectObjectValuesChangeCallback";

import { SEARCH_ETABLISSEMENTS, ALL_ETABLISSEMENTS } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const resultPerPage = 10;

function RowItem(props) {
  const { item } = props;
  const { id, siret, rslongue, ligneacheminement, departement } = item;
  return (
    <Fragment>
      <Card sx={cardStyle} width="100%">
        <Flex justifyContent="space-between">
          <Box>
            <Flex justifyContent="space-start">
              <Flex width="150px" flexDirection="column">
                <Text sx={labelStyle}>SIRET</Text>
                <Text sx={descriptionStyle}>{siret}</Text>
              </Flex>
              <Flex width="500px" flexDirection="column">
                <Text sx={labelStyle}>Raison sociale</Text>
                <Text sx={descriptionStyle}>{rslongue}</Text>
              </Flex>
              <Flex width="400px" flexDirection="column">
                <Text sx={labelStyle}>Commune</Text>
                <Text sx={descriptionStyle}>
                  {ligneacheminement} ({departement.nom})
                </Text>
              </Flex>
            </Flex>
          </Box>
          <Box mr="1" width="120px">
            <Link to={`/admin/etablissements/${id}`}>
              <Button>Voir</Button>
            </Link>
          </Box>
        </Flex>
      </Card>
    </Fragment>
  );
}

export function AdminEtablissements() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const { debouncedSearchText, selectedDepartementCode } = useContext(
    AdminFilterContext
  );

  useEffectObjectValuesChangeCallback(
    { debouncedSearchText, selectedDepartementCode },
    () => {
      if (currentOffset !== 0) {
        setCurrentOffset(0);
      }
    }
  );

  const searching = debouncedSearchText && debouncedSearchText !== "";
  const query = searching ? SEARCH_ETABLISSEMENTS : ALL_ETABLISSEMENTS;
  const variables = {
    departementCode: selectedDepartementCode ? selectedDepartementCode : null,
    limit: resultPerPage,
    offset: currentOffset,
    ...(searching
      ? {
          search: `%${debouncedSearchText}%`,
        }
      : {}),
  };

  const { data, error, loading } = useQuery(query, { variables });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const dataKey = searching ? "search_etablissements" : "etablissements";
  const dataAggregateKey = dataKey + "_aggregate";
  return (
    <PaginatedList
      entries={data ? data[dataKey] : []}
      RowItem={RowItem}
      count={
        data && data[dataAggregateKey]
          ? data[dataAggregateKey].aggregate.count
          : 0
      }
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
}

export default AdminEtablissements;
