import { useMutation, useQuery } from "@apollo/react-hooks";
import { Select } from "@emjpm/ui";
import React, { useState } from "react";
import { Box, Button, Flex, Text } from "rebass";

import { ADD_MAGISTRAT, DELETE_MAGISTRAT } from "./mutations";
import { MAGISTRAT } from "./queries";

const AdminUsersMagistratTribunal = (props) => {
  const { id: userId } = props;

  const [selectedTribunal, setSelectedTribunal] = useState(null);

  const { data, loading } = useQuery(MAGISTRAT, {
    variables: {
      userId,
    },
  });

  const [deleteMagistrat] = useMutation(DELETE_MAGISTRAT);
  const [addMagistrat] = useMutation(ADD_MAGISTRAT);

  if (loading || !data) {
    return null;
  }

  return (
    <Box>
      {data.magistrat.map((magistrat) => {
        const { ti, id } = magistrat;

        return (
          <Flex
            mb={10}
            alignItems="center"
            justifyContent="space-between"
            key={`aui-${id}`}
          >
            <Text>{ti.etablissement}</Text>
            <Box>
              <Button
                onClick={() =>
                  deleteMagistrat({
                    refetchQueries: ["admin_magistrat"],
                    variables: { id },
                  })
                }
              >
                Supprimer
              </Button>
            </Box>
          </Flex>
        );
      })}

      {data.magistrat.length === 0 && (
        <Flex alignItems="center" justifyContent="space-between">
          <Box width={300}>
            <Select
              placeholder="Ajouter un tribunal"
              onChange={({ value }) => setSelectedTribunal(value)}
              options={data.tis.map((ti) => ({
                label: ti.etablissement,
                value: ti.id,
              }))}
            />
          </Box>
          <Button
            onClick={() => {
              if (selectedTribunal) {
                addMagistrat({
                  refetchQueries: ["admin_magistrat"],
                  variables: { tiId: selectedTribunal, userId },
                });
              }
            }}
          >
            Ajouter
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default AdminUsersMagistratTribunal;
