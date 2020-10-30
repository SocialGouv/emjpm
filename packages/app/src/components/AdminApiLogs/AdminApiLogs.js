import { useApolloClient } from "@apollo/react-hooks";
import { Button, Card, Heading4, Spinner } from "@emjpm/ui";
import { format } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Box, Flex } from "rebass";

import { useDebounce } from "../../lib/hooks";
import { API_LOGS, API_LOGS_SEARCH } from "./queries";

const AdminApiLogs = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const debouncedSearchQuery = useDebounce(searchQuery, 1000);
  const client = useApolloClient();

  const fetchLogs = React.useCallback(
    async (options) => {
      const { data } = await client.query(options);

      setLogs(data.api_logs);
      setLoading(false);
    },
    [client]
  );

  useEffect(() => {
    setLoading(true);

    if (!debouncedSearchQuery) {
      fetchLogs({ query: API_LOGS });
      return;
    }

    fetchLogs({ query: API_LOGS_SEARCH, variables: { search: debouncedSearchQuery } });
  }, [fetchLogs, debouncedSearchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Card>
      <Flex alignItems="center" mt="2" mb="4">
        <Heading4>API Logs</Heading4>
        <Flex m="auto" alignItems="center" justifyContent="flex-end" sx={{ flexGrow: 1 }}>
          {!isLoading || <Spinner />}
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
      {!logs.length ? (
        <Box>Aucun résultats.</Box>
      ) : (
        <Box>
          {logs.map((log) => (
            <Flex
              key={log.id}
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
                {format(new Date(log.created_at), "dd/MM/yyyy hh:mm")}
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
                {log.request_method}
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
                {log.request_url}
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
                {log.token}
              </Box>
              <Box
                sx={{
                  width: 200,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {JSON.stringify(log.response, null, "\t")}
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
                <Link href={`/admin/api-logs/[api_log_id]`} as={`/admin/api-logs/${log.id}`}>
                  <a>
                    <Button>Voir</Button>
                  </a>
                </Link>
              </Flex>
            </Flex>
          ))}
        </Box>
      )}
    </Card>
  );
};

export { AdminApiLogs };
