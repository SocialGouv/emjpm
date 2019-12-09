import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Text } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { SERVICES } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

// import { AdminEditService } from "./AdminEditService";
// {editMode && (
//   <Card overflow="hidden" p="0" pt="1" m="1" mt="-20px">
//     <AdminEditService service={item} closePanel={toogleEditMode} />
//   </Card>
// )}

const RowItem = ({ item }) => {
  const { id, etablissement, code_postal, ville } = item;

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
                <Text sx={descriptionStyle}>{etablissement}</Text>
              </Flex>
              <Flex width="300px" flexDirection="column">
                <Text sx={labelStyle}>Ville</Text>
                <Text sx={descriptionStyle}>
                  {ville} ({code_postal})
                </Text>
              </Flex>
            </Flex>
          </Box>
          <Box mr="1" width="120px">
            <Link href={`/admin/services/${id}`}>
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

const AdminServices = () => {
  const resultPerPage = 50;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading, fetchMore } = useQuery(SERVICES, {
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

  const { count } = data.services_aggregate.aggregate;
  const services = data.services;
  const isMoreEntry = services.length < count;

  return (
    <PaginatedList
      resultPerPage={resultPerPage}
      RowItem={RowItem}
      entries={services}
      totalEntry={count}
      isMoreEntry={isMoreEntry}
      onLoadMore={offset => {
        fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            return {
              count: fetchMoreResult.count,
              services: [...prev.services, ...fetchMoreResult.services]
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

export { AdminServices };
