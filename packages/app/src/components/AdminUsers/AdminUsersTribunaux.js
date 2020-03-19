import { useMutation, useQuery } from "@apollo/react-hooks";
import { Select } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";
import { Box, Button, Flex, Text } from "rebass";

import { ADD_USER_TIS, DELETE_USER_TIS } from "./mutations";
import { USER_TIS } from "./queries";

const AdminUsersTribunaux = props => {
  const { id: userId } = props;

  const [selectedTribunal, setSelectedTribunal] = useState(undefined);

  const { data, loading } = useQuery(USER_TIS, {
    variables: {
      userId
    }
  });

  const [deleteUserTribunalRelation] = useMutation(DELETE_USER_TIS);
  const [addUserTribunalRelation] = useMutation(ADD_USER_TIS);

  if (loading || !data) {
    return null;
  }

  const { user_tis, tis } = data;

  return (
    <Box>
      {user_tis.map(relation => {
        const { ti, id } = relation;

        return (
          <Flex mb={10} alignItems="center" justifyContent="space-between" key={`aui-${id}`}>
            <Text>{ti.etablissement}</Text>
            <Box>
              <Button
                onClick={() =>
                  deleteUserTribunalRelation({
                    variables: { id },
                    refetchQueries: ["admin_user_tis"]
                  })
                }
              >
                Supprimer
              </Button>
            </Box>
          </Flex>
        );
      })}

      <Flex alignItems="center" justifyContent="space-between">
        <Box width={300}>
          <Select
            placeholder="Ajouter un tribunal"
            onChange={({ value }) => setSelectedTribunal(value)}
            options={tis
              .filter(ti => !user_tis.some(relation => relation.ti.id === ti.id))
              .map(ti => ({ label: ti.etablissement, value: ti.id }))}
          />
        </Box>
        <Button
          onClick={() => {
            if (selectedTribunal) {
              addUserTribunalRelation({
                refetchQueries: ["admin_user_tis"],
                variables: { userId, tiId: selectedTribunal }
              });
            }
          }}
        >
          Ajouter
        </Button>
      </Flex>
    </Box>
  );
};

export default AdminUsersTribunaux;
