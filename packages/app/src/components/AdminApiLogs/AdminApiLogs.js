import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Heading4, Spinner } from "@emjpm/ui";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { Box, Flex } from "rebass";

import { useDebounce } from "../../lib/hooks";
import { PaginatedList } from "../PaginatedList";
import { API_LOGS_SEARCH } from "./queries";

const RowItem = ({ item }) => {
  const { id, created_at, request_method, request_url, token, response } = item;
  return (
    <>
      <Flex
        key={id}
        sx={{
          p: 2,
          borderBottom: "1px solid",
          borderColor: "whiteGray",
        }}
      >
        <Box
          sx={{
            width: 120,
            mr: 2,
          }}
        >
          {format(new Date(created_at), "dd/MM/yyyy hh:mm")}
        </Box>
        <Box
          sx={{
            width: 80,
            whiteSpace: "nowrap",
            overflow: "hidden",
            BoxOverflow: "ellipsis",
            mr: 2,
          }}
        >
          {request_method}
        </Box>
        <Box
          sx={{
            width: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mr: 2,
          }}
        >
          {request_url}
        </Box>
        <Box
          sx={{
            width: 150,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mr: 2,
          }}
        >
          {token}
        </Box>
        <Box
          sx={{
            width: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {JSON.stringify(response, null, "\t")}
        </Box>
        <Flex
          sx={{
            width: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: "auto",
            justifyContent: "flex-end",
          }}
        >
          <Link href={`/admin/api-logs/[api_log_id]`} as={`/admin/api-logs/${id}`}>
            <a>
              <Button>Voir</Button>
            </a>
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
        <Flex m="auto" alignItems="center" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
          {!loading || <Spinner />}
          <Box
            as="input"
            placeholder="Rechercher..."
            sx={{
              "&:focus": {
                outline: "none",
                borderColor: "textTertiary",
              },
              width: 300,
              border: "1px solid",
              borderColor: "whiteGray",
              borderRadius: 4,
              p: 2,
            }}
            onChange={handleSearchChange}
            value={searchQuery}
          />
        </Flex>
      </Flex>
      <Flex
        sx={{
          mb: 2,
          p: 2,
          borderBottom: "1px solid whiteGray",
          bg: "muted",
          color: "mediumGray",
          fontWeight: "bold",
        }}
      >
        <Box
          sx={{
            width: 120,
            mr: 2,
          }}
        >
          DATE
        </Box>
        <Box
          sx={{
            width: 80,
            whiteSpace: "nowrap",
            overflow: "hidden",
            BoxOverflow: "ellipsis",
            mr: 2,
          }}
        >
          METHOD
        </Box>
        <Box
          sx={{
            width: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mr: 2,
          }}
        >
          URL
        </Box>
        <Box
          sx={{
            width: 150,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mr: 2,
          }}
        >
          TOKEN
        </Box>
        <Box
          sx={{
            width: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
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
