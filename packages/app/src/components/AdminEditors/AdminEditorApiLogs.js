import { useQuery } from "@apollo/react-hooks";
import { Heading4 } from "@socialgouv/emjpm-ui-core";
import { format } from "date-fns";
import React from "react";
import { Box, Flex } from "rebass";
import { Eye } from "styled-icons/octicons";

import { API_LOGS_BY_EDITOR_ID } from "./queries";

const AdminEditorApiLogs = props => {
  const { editorId } = props;
  const { data, loading, error } = useQuery(API_LOGS_BY_EDITOR_ID, {
    variables: { editorId }
  });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error || !data.api_logs) {
    return <div>Erreur</div>;
  }

  return (
    <Box>
      <Heading4 mb={2}>API Logs</Heading4>
      <Flex
        sx={{
          mb: 2,
          p: 2,
          borderBottom: "1px solid whiteGray",
          bg: "muted",
          color: "mediumGray",
          fontWeight: "bold"
        }}
      >
        <Box
          sx={{
            width: 120,
            mr: 2
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
            mr: 2
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
            mr: 2
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
            mr: 2
          }}
        >
          TOKEN
        </Box>
        <Box
          sx={{
            width: 200,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          RESPONSE
        </Box>
      </Flex>
      {data.api_logs.length ? (
        <Box>
          {data.api_logs.map(log => (
            <Flex
              key={log.id}
              sx={{
                p: 2,
                borderBottom: "1px solid",
                borderColor: "whiteGray"
              }}
            >
              <Box
                sx={{
                  width: 120,
                  mr: 2
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
                  mr: 2
                }}
              >
                {log.request.method}
              </Box>
              <Box
                sx={{
                  width: 200,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  mr: 2
                }}
              >
                {log.request.url}
              </Box>
              <Box
                sx={{
                  width: 150,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  mr: 2
                }}
              >
                {log.token}
              </Box>
              <Box
                sx={{
                  width: 200,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
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
                  justifyContent: "flex-end"
                }}
              >
                <Eye size="18" />
              </Flex>
            </Flex>
          ))}
        </Box>
      ) : (
        <Box>Aucun logs enregistrés.</Box>
      )}
    </Box>
  );
};

export { AdminEditorApiLogs };
