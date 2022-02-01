import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { stdFormatter } from "@emjpm/biz";

import { Box, Flex } from "rebass";

import { Link } from "~/components/Link";
import { PaginatedList } from "~/containers/PaginatedList";
import { useDebounce } from "~/hooks";
import useQueryReady from "~/hooks/useQueryReady";
import { Button, Card, Heading } from "~/components";

import { API_LOGS_SEARCH } from "./queries";

function RowItem({ item }) {
  const { id, created_at, request_method, request_url, token, response } = item;
  return (
    <>
      <Flex
        key={id}
        sx={{
          borderBottom: "1px solid",
          borderColor: "whiteGray",
          p: 2,
        }}
      >
        <Box
          sx={{
            mr: 2,
            width: 120,
          }}
        >
          {stdFormatter.formatDateTimeUI(created_at)}
        </Box>
        <Box
          sx={{
            BoxOverflow: "ellipsis",
            mr: 2,
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: 80,
          }}
        >
          {request_method}
        </Box>
        <Box
          sx={{
            mr: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: 200,
          }}
        >
          {request_url}
        </Box>
        <Box
          sx={{
            mr: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: 150,
          }}
        >
          {token}
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: 200,
          }}
        >
          {JSON.stringify(response, null, "\t")}
        </Box>
        <Flex
          sx={{
            justifyContent: "flex-end",
            margin: "auto",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: 200,
          }}
        >
          <Link to={`/admin/api-logs/${id}`}>
            <Button>Voir</Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

function AdminApiLogs() {
  const [searchQuery, setSearchQuery] = useState(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [currentOffset, setCurrentOffset] = useState(0);
  const resultPerPage = 5;

  useEffect(() => {
    setCurrentOffset(0);
  }, [debouncedSearchQuery]);

  const { data, loading, error } = useQuery(API_LOGS_SEARCH, {
    fetchPolicy: "network-only",
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      search: debouncedSearchQuery || null,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { count } = data?.api_logs_aggregate?.aggregate;
  const { api_logs } = data;

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <Card>
      <Flex alignItems="center" mt="2" mb="4">
        <Heading size={4}>API Logs</Heading>
        <Flex
          m="auto"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ flexGrow: 1 }}
        >
          <Box
            as="input"
            placeholder="Rechercher..."
            sx={{
              "&:focus": {
                borderColor: "textTertiary",
                outline: "none",
              },
              border: "1px solid",
              borderColor: "whiteGray",
              borderRadius: 4,
              p: 2,
              width: 300,
            }}
            onChange={handleSearchChange}
            value={searchQuery}
            aria-label="Rechercher"
          />
        </Flex>
      </Flex>
      <Flex
        sx={{
          bg: "muted",
          borderBottom: "1px solid whiteGray",
          color: "mediumGray",
          fontWeight: "bold",
          mb: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            mr: 2,
            width: 120,
          }}
        >
          DATE
        </Box>
        <Box
          sx={{
            BoxOverflow: "ellipsis",
            mr: 2,
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: 80,
          }}
        >
          METHOD
        </Box>
        <Box
          sx={{
            mr: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: 200,
          }}
        >
          URL
        </Box>
        <Box
          sx={{
            mr: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: 150,
          }}
        >
          TOKEN
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: 200,
          }}
        >
          RESPONSE
        </Box>
      </Flex>

      <PaginatedList
        entries={api_logs}
        RowItem={RowItem}
        count={count}
        resultPerPage={resultPerPage}
        currentOffset={currentOffset}
        setCurrentOffset={setCurrentOffset}
      />
    </Card>
  );
}

export { AdminApiLogs };
