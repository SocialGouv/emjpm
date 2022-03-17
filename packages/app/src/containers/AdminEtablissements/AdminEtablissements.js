import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Flex, Text } from "rebass";

import { Context as AdminFilterContext } from "~/containers/FilterWidgets/context";
import { PaginatedList } from "~/containers/PaginatedList";
import { Button, Card } from "~/components";

import useQueryReady from "~/hooks/useQueryReady";
import useEffectObjectValuesChangeCallback from "~/hooks/useEffectObjectValuesChangeCallback";

import { SEARCH_ETABLISSEMENTS } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const resultPerPage = 10;

function RowItem(props) {
  const { item } = props;
  const { id, siret, rslongue, ligneacheminement, departement } = item;
  return (
    <>
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
            <Button
              as="a"
              type={null}
              title="Voir l'établissement"
              aria-label="Voir l'établissement"
              href={`/admin/etablissements/${id}`}
            >
              Voir
            </Button>
          </Box>
        </Flex>
      </Card>
    </>
  );
}

export function AdminEtablissements() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const {
    debouncedFilters: { searchText },
    filters: { departementCode },
  } = useContext(AdminFilterContext);

  useEffectObjectValuesChangeCallback({ searchText, departementCode }, () => {
    if (currentOffset !== 0) {
      setCurrentOffset(0);
    }
  });

  const searching = searchText && searchText !== "";
  const variables = {
    departementCode,
    limit: resultPerPage,
    offset: currentOffset,
    ...(searching
      ? {
          search: searchText || null,
        }
      : {}),
  };

  const { data, error, loading } = useQuery(SEARCH_ETABLISSEMENTS, {
    variables,
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <PaginatedList
      entries={data ? data.search_etablissements : []}
      RowItem={RowItem}
      count={data?.search_etablissements_aggregate?.aggregate?.count || 0}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
}

export default AdminEtablissements;
