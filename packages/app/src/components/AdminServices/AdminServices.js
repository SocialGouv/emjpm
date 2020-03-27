import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Text } from "@emjpm/ui";
import Link from "next/link";
import React, { Fragment, useContext, useState } from "react";
import { Box, Flex } from "rebass";

import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { SERVICES } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

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
            <Link href={`/admin/services/[service_id]`} as={`/admin/services/${id}`}>
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
  const [currentOffset, setCurrentOffset] = useState(0);
  const resultPerPage = 50;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading } = useQuery(SERVICES, {
    fetchPolicy: "network-only",
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
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

  return (
    <PaginatedList
      entries={services}
      RowItem={RowItem}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export { AdminServices };
