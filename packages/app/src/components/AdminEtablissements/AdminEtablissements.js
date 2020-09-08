import { Button, Card } from "@emjpm/ui";
import Link from "next/link";
import React, { Fragment, useContext, useState } from "react";
import { useQuery } from "react-apollo";
import { Box, Flex, Text } from "rebass";

import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { ETABLISSEMENTS } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const resultPerPage = 50;

const RowItem = (props) => {
  const { item } = props;
  const { id, nom, code_postal, ville, departement } = item;
  return (
    <Fragment>
      <Card sx={cardStyle} width="100%">
        <Flex justifyContent="space-between">
          <Box>
            <Flex justifyContent="space-start">
              <Flex width="50px" flexDirection="column">
                <Text sx={labelStyle}>id</Text>
                <Text sx={descriptionStyle}>{id}</Text>
              </Flex>
              <Flex width="350px" flexDirection="column">
                <Text sx={labelStyle}>Nom</Text>
                <Text sx={descriptionStyle}>{nom}</Text>
              </Flex>
              <Flex width="300px" flexDirection="column">
                <Text sx={labelStyle}>Ville</Text>
                <Text sx={descriptionStyle}>
                  {ville} ({code_postal})
                </Text>
              </Flex>
              <Flex width="300px" flexDirection="column">
                <Text sx={labelStyle}>Département</Text>
                <Text sx={descriptionStyle}>{departement.nom}</Text>
              </Flex>
            </Flex>
          </Box>
          <Box mr="1" width="120px">
            <Link href={`/admin/etablissements/[id]`} as={`/admin/etablissements/${id}`}>
              <a>
                <Button>Voir</Button>
              </a>
            </Link>
          </Box>
        </Flex>
      </Card>
    </Fragment>
  );
};

export const AdminEtablissements = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const { debouncedSearchText, selectedDepartementId } = useContext(AdminFilterContext);

  const { data, error, loading } = useQuery(ETABLISSEMENTS, {
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      search: debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null,
      departementId: selectedDepartementId ? selectedDepartementId : null,
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
        data && data.etablissements_aggregate ? data.etablissements_aggregate.aggregate.count : 0
      }
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export default AdminEtablissements;
