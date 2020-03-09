import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Card } from "@socialgouv/emjpm-ui-core";
import { format } from "date-fns";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { REMOVE_SATISFACTION_CAMPAIGN } from "./mutations";
import { SATISFACTION_CAMPAIGNS } from "./queries";
import { descriptionStyle, labelStyle } from "./style";

const RowItem = ({ item }) => {
  const { id, name, started_at, ended_at } = item;
  const [removeSatisfactionCampaign] = useMutation(REMOVE_SATISFACTION_CAMPAIGN);

  const removeSatisfactionCampaignFromList = async id => {
    try {
      await removeSatisfactionCampaign({
        refetchQueries: ["satisfactionCampaign", ""],
        variables: {
          id: id
        }
      });
    } catch (error) {
      // TODO(paullaunay): log error in sentry and form
    }
  };

  return (
    <Card width="100%" mb="2">
      <Flex justifyContent="space-between">
        <Flex justifyContent="flex-start">
          <Flex width="100px" flexDirection="column">
            <Text sx={labelStyle}>ID</Text>
            <Text sx={descriptionStyle}>{id}</Text>
          </Flex>
          <Flex width="100px" flexDirection="column">
            <Text sx={labelStyle}>Name</Text>
            <Text sx={descriptionStyle}>{name}</Text>
          </Flex>
          <Flex width="100px" flexDirection="column">
            <Text sx={labelStyle}>Date de début</Text>
            <Text sx={descriptionStyle}>{format(new Date(started_at), "dd/MM/yyyy")}</Text>
          </Flex>
          <Flex width="100px" flexDirection="column">
            <Text sx={labelStyle}>Date de fin</Text>
            <Text sx={descriptionStyle}>{format(new Date(ended_at), "dd/MM/yyyy")}</Text>
          </Flex>
        </Flex>

        <Box mr="1" width="220px">
          <Link href={`/admin/satisfaction_campaigns/${id}`}>
            <a>
              <Button>Voir</Button>
            </a>
          </Link>
          <Button ml="3" onClick={() => removeSatisfactionCampaignFromList(id)}>
            supprimer
          </Button>
        </Box>
      </Flex>
    </Card>
  );
};

const AdminSatisfactionCampaigns = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const resultPerPage = 20;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading } = useQuery(SATISFACTION_CAMPAIGNS, {
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

  return (
    <PaginatedList
      entries={data.satisfaction_campaigns}
      RowItem={RowItem}
      count={data.satisfaction_campaigns.size}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export { AdminSatisfactionCampaigns };
