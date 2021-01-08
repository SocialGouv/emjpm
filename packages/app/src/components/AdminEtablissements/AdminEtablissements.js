import React, { Fragment, useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Flex, Text } from "rebass";

import { AdminFilterContext } from "~/components/AdminFilterBar/context";
import { Link } from "~/components/Link";
import { PaginatedList } from "~/components/PaginatedList";
import { Button, Card } from "~/ui";

import useEffectObjectValuesChangeCallback from "~/hooks/useEffectObjectValuesChangeCallback";

import { ETABLISSEMENTS } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const resultPerPage = 50;

const RowItem = (props) => {
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
};

export const AdminEtablissements = () => {
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

  const { data, error, loading } = useQuery(ETABLISSEMENTS, {
    variables: {
      departementCode: selectedDepartementCode ? selectedDepartementCode : null,
      limit: resultPerPage,
      offset: currentOffset,
      search:
        debouncedSearchText && debouncedSearchText !== ""
          ? `%${debouncedSearchText}%`
          : null,
    },
  });

  if (error) {
    return <Text>Oups, une erreur est survenue.</Text>;
  }

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  return (
    <PaginatedList
      entries={data ? data.etablissements : []}
      RowItem={RowItem}
      count={
        data && data.etablissements_aggregate
          ? data.etablissements_aggregate.aggregate.count
          : 0
      }
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export default AdminEtablissements;
