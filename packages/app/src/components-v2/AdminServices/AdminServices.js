import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Input } from "@socialgouv/emjpm-ui-core";
import React, { Fragment, useEffect, useState } from "react";
import { Box, Flex, Text } from "rebass";
import { useDebounce } from "../../lib/hooks";
import { SERVICES } from "./queries";
import { AdminServicesStyle, cardStyle, FilterTextStyle } from "./style";

const RESULT_PER_PAGE = 20;

const ServiceRow = ({ id, etablissement, code_postal, ville }) => (
  <Card sx={cardStyle} width="100%">
    <Flex justifyContent="space-between">
      <Box width="30px">{id}</Box>
      <Box width="250px">{etablissement}</Box>
      <Box width="80px">{code_postal}</Box>
      <Box width="200px">{ville}</Box>
      <Box mr="1" width="120px">
        <Button width="120px" onClick={() => {}} variant="outline">
          Modifier
        </Button>
      </Box>
    </Flex>
  </Card>
);

const ServiceList = ({ services }) => (
  <Flex flexDirection="column">
    {services.map(service => (
      <ServiceRow key={service.id} {...service} />
    ))}
  </Flex>
);

const FilterBar = ({ searchText, changeSearchText }) => (
  <Card mt="3">
    <Flex justifyContent={"space-between"} flexWrap="wrap">
      <Box>
        <Flex>
          <Text sx={FilterTextStyle}>AFFINER LES RÉSULTATS</Text>
          <Box width="170px" mr={1}>
            <Input
              value={searchText}
              spellCheck="false"
              autoComplete="false"
              onChange={event => changeSearchText(event.target.value)}
              name="search"
              size="small"
              placeholder="Filtre"
            />
          </Box>
        </Flex>
      </Box>
    </Flex>
  </Card>
);

const AdminServices = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => setCurrentPage(RESULT_PER_PAGE), []);

  const [searchText, changeSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 1000);

  const { data, error, loading, fetchMore } = useQuery(SERVICES, {
    variables: {
      offset: 0,
      limit: RESULT_PER_PAGE,
      searchText:
        debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null
    },
    fetchPolicy: "network-only"
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
    <Box sx={AdminServicesStyle}>
      <FilterBar searchText={searchText} changeSearchText={changeSearchText} />
      {services.length > 0 ? (
        <Fragment>
          <ServiceList services={services} />
          {count > RESULT_PER_PAGE && count > currentPage && (
            <Flex mt="5" alignItem="center">
              <Button
                onClick={() => {
                  fetchMore({
                    variables: {
                      offset: currentPage + RESULT_PER_PAGE
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      setCurrentPage(currentPage + RESULT_PER_PAGE);
                      return {
                        count: fetchMoreResult.count,
                        services: [...prev.services, ...fetchMoreResult.services]
                      };
                    }
                  });
                }}
              >
                Afficher les services suivants
              </Button>
            </Flex>
          )}
        </Fragment>
      ) : (
        <div>Pas de donnée à afficher</div>
      )}
    </Box>
  );
};

export { AdminServices };
