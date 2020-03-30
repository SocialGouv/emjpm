import { useQuery } from "@apollo/react-hooks";
import { Button, Card } from "@emjpm/ui";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { USERS } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const RowItem = ({ item }) => {
  const { id, nom, prenom, email, type, active } = item;

  return (
    <>
      <Card sx={cardStyle(active)} width="100%">
        <Flex justifyContent="space-between">
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
            <Flex width="100px" flexDirection="column">
              <Text sx={labelStyle}>état</Text>
              <Text sx={descriptionStyle}>{active ? "activé" : "non activé"}</Text>
            </Flex>
          </Flex>
          <Box mr="1" width="120px">
            <Link
              href={`/admin/users/[user_id]`}
              as={`/admin/users/${id}?type=${type}&active=${active}`}
            >
              <a>
                <Button>Voir</Button>
              </a>
            </Link>
          </Box>
        </Flex>
      </Card>
    </>
  );
};

const AdminUsers = () => {
  const resultPerPage = 50;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading } = useQuery(USERS, {
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

  const { count } = data.users_aggregate.aggregate;
  const users = data.users;

  return (
    <PaginatedList
      entries={users}
      RowItem={RowItem}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export { AdminUsers };
