import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Text } from "@socialgouv/emjpm-ui-core";
import React, { useContext, useState } from "react";
import { Box, Flex } from "rebass";

import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { AdminEditTribunal } from "./AdminEditTribunal";
import { TRIBUNAUX } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const RowItem = ({ item }) => {
  const { id, etablissement, code_postal, ville, siret } = item;
  const [editMode, setEditMode] = useState(false);

  const toogleEditMode = () => setEditMode(!editMode);

  return (
    <>
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
                <Text sx={descriptionStyle}>{etablissement}</Text>
              </Flex>
              <Flex width="300px" flexDirection="column">
                <Text sx={labelStyle}>Ville</Text>
                <Text sx={descriptionStyle}>
                  {ville} ({code_postal})
                </Text>
              </Flex>
              <Flex width="300px" flexDirection="column">
                <Text sx={labelStyle}>SIRET</Text>
                <Text sx={descriptionStyle}>{siret}</Text>
              </Flex>
            </Flex>
          </Box>
          <Box mr="1" width="120px">
            <Button width="120px" onClick={toogleEditMode} variant="outline">
              Modifier
            </Button>
          </Box>
        </Flex>
      </Card>
      {editMode && (
        <Card overflow="hidden" p="0" pt="1" m="1" mt="-20px">
          <AdminEditTribunal tribunal={item} closePanel={toogleEditMode} />
        </Card>
      )}
    </>
  );
};

const AdminTribunaux = () => {
  const resultPerPage = 50;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading, fetchMore } = useQuery(TRIBUNAUX, {
    fetchPolicy: "network-only",
    variables: {
      limit: resultPerPage,
      offset: 0,
      searchText:
        debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { count } = data.tis_aggregate.aggregate;
  const tis = data.tis;
  const isMoreEntry = tis.length < count;

  return (
    <PaginatedList
      resultPerPage={resultPerPage}
      RowItem={RowItem}
      entries={tis}
      totalEntry={count}
      isMoreEntry={isMoreEntry}
      onLoadMore={offset => {
        fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            return {
              count: fetchMoreResult.count,
              tis: [...prev.tis, ...fetchMoreResult.tis]
            };
          },
          variables: {
            offset
          }
        });
      }}
    />
  );
};

export { AdminTribunaux };
