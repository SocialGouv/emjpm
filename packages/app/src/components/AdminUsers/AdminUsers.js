import { useQuery } from "@apollo/react-hooks";
import { Button, Card } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { USERS } from "./queries";
import { cardStyle, descriptionStyle, labelStyle } from "./style";

const ServiceDetail = ({ service_admins }) => (
  <>
    <Text sx={labelStyle}>service</Text>
    {service_admins.map((val, index) => (
      <Text sx={descriptionStyle} key={index}>
        {val.service.etablissement}
      </Text>
    ))}
  </>
);

const MandataireDetail = ({ user_tis }) => (
  <>
    <Text sx={labelStyle}>tribunaux</Text>
    {user_tis.map((val, index) => (
      <Text sx={descriptionStyle} key={index}>
        {val.ti.ville}
      </Text>
    ))}
  </>
);

const MagistratDetail = ({ magistrat }) => (
  <>
    <Text sx={labelStyle}>tribunal</Text>
    <Text sx={descriptionStyle}>
      {magistrat && magistrat.ti ? magistrat.ti.ville : "Non renseigné"}
    </Text>
  </>
);

const DirectionDetail = () => <></>;

const getDetail = type => {
  if (type === "service") {
    return ServiceDetail;
  } else if (type === "individuel") {
    return MandataireDetail;
  } else if (type === "prepose") {
    return MandataireDetail;
  } else if (type === "ti") {
    return MagistratDetail;
  } else {
    return DirectionDetail;
  }
};

const RowItem = ({ item }) => {
  const { id, nom, prenom, email, type } = item;
  const DetailComponent = getDetail(type);

  return (
    <>
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
          <Flex width="300px" flexDirection="column">
            <DetailComponent {...item} />
          </Flex>
          <Box mr="1" width="120px">
            <Link href={`/admin/users/${id}`}>
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
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading, fetchMore } = useQuery(USERS, {
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
          updateQuery: (prev, { fetchMoreResult }) => {
            return {
              users: [...prev.users, ...fetchMoreResult.users]
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

export { AdminUsers };
