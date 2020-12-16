import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Heading4, Spinner } from "@emjpm/ui";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { Box, Flex } from "rebass";

import { PaginatedList } from "~/components/PaginatedList";
import { useDebounce } from "~/lib/hooks";

import { API_LOGS_SEARCH } from "./queries";

const RowItem = ({ item }) => {
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
          {format(new Date(created_at), "dd/MM/yyyy hh:mm")}
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
          <Link
            href={`/admin/api-logs/[api_log_id]`}
            as={`/admin/api-logs/${id}`}
          >
            <Button>Voir</Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

const AdminApiLogs = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const [currentOffset, setCurrentOffset] = useState(0);
  const resultPerPage = 5;

  React.useEffect(() => {
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

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return (
      <div>
        Oups, une erreur est survenue
        <span role="img" aria-hidden="true">
          😕👇
        </span>
      </div>
    );
  }

  const { count } = data?.api_logs_aggregate?.aggregate;
  const { api_logs } = data;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Card>
      <Flex alignItems="center" mt="2" mb="4">
        <Heading4>API Logs</Heading4>
        <Flex
          m="auto"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ flexGrow: 1 }}
        >
          {!loading || <Spinner />}
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
};

export { AdminApiLogs };
