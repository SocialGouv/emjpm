import { useQuery } from "@apollo/react-hooks";
import { Button, Card } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";
import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { USERS } from "./queries";
import { cardStyle, labelStyle, descriptionStyle } from "./style";

const RowItem = ({
  id,
  nom,
  prenom,
  email,
  type,
  magistrat,
  mandataire,
  user_tis,
  service_admins
}) => (
  <Card sx={cardStyle} width="100%">
    <Flex justifyContent="flex-start">
      <Flex width="100px" flexDirection="column">
        <Text sx={labelStyle}>id</Text>
        <Text sx={descriptionStyle}>{id}</Text>
        <Text sx={descriptionStyle}>{type}</Text>
      </Flex>
      <Box width="300px">
        <Text sx={labelStyle}>email</Text>
        <Text sx={descriptionStyle}>{email}</Text>
      </Box>
      <Flex width="200px" flexDirection="column">
        <Text sx={labelStyle}>prénom / nom</Text>
        <Text sx={descriptionStyle}>{prenom}</Text>
        <Text sx={descriptionStyle}>{nom}</Text>
      </Flex>
      <Flex width="300px" flexDirection="column" ml={1}>
        {mandataire && (
          <>
            <Text sx={labelStyle}>tribunaux</Text>
            {user_tis.map((ti, index) => (
              <Text sx={descriptionStyle} key={index}>
                {ti.etablissement}
              </Text>
            ))}
          </>
        )}
        {service_admins && (
          <>
            <Text sx={labelStyle}>service</Text>
            {service_admins.map((val, index) => (
              <Text sx={descriptionStyle} key={index}>
                {val.service.etablissement}
              </Text>
            ))}
          </>
        )}
        {magistrat && (
          <>
            <Text sx={labelStyle}>tribunal</Text>
            <Text sx={descriptionStyle}>{magistrat.ti.etablissement}</Text>
          </>
        )}
      </Flex>
      <Box mr="1" width="120px">
        <Button width="120px" onClick={() => {}} variant="outline">
          Modifier
        </Button>
      </Box>
    </Flex>
  </Card>
);

const AdminUsers = () => {
  const resultPerPage = 50;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading, fetchMore } = useQuery(USERS, {
    variables: {
      offset: 0,
      limit: resultPerPage,
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

  const { count } = data.users_aggregate.aggregate;
  const users = data.users;
  const isMoreEntry = users.length < count;

  return (
    <PaginatedList
      resultPerPage={resultPerPage}
      RowItem={RowItem}
      entries={users}
      totalEntry={count}
      isMoreEntry={isMoreEntry}
      onLoadMore={offset => {
        fetchMore({
          variables: {
            offset
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            return {
              count: fetchMoreResult.count,
              users: [...prev.users, ...fetchMoreResult.users]
            };
          }
        });
      }}
    />
  );
};

export { AdminUsers };
