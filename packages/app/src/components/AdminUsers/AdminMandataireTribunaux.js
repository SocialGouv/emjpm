import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Heading4, Select } from "@emjpm/ui";
import React, { useState } from "react";
import { Box, Flex, Text } from "rebass";

import { FormGrayBox, FormInputBox } from "../AppForm";
import { ADD_MANDATAIRE_TIS, DELETE_MANDATAIRE_TIS } from "./mutations";
import { MANDATAIRE_TIS } from "./queries";

const AdminMandataireTribunaux = (props) => {
  const { userId } = props;

  const [selectedTribunal, setSelectedTribunal] = useState(undefined);

  const { data, loading } = useQuery(MANDATAIRE_TIS, {
    variables: {
      userId,
    },
  });

  const [deleteMandataireTribunalRelation] = useMutation(DELETE_MANDATAIRE_TIS);
  const [addMandataireTribunalRelation] = useMutation(ADD_MANDATAIRE_TIS);

  if (loading || !data) {
    return null;
  }

  const { mandataire_tis, tis, mandataires } = data;

  const [mandataire] = mandataires;
  const { id: mandataireId } = mandataire;

  return (
    <Flex>
      <FormGrayBox>
        <Heading4 mb={1}>{"Tribunaux"}</Heading4>
      </FormGrayBox>
      <FormInputBox>
        {mandataire_tis.map((relation) => {
          const { ti, id } = relation;

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
                    deleteMandataireTribunalRelation({
                      refetchQueries: ["admin_mandataire_tis"],
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

        <Flex alignItems="center" justifyContent="space-between">
          <Box width={300}>
            <Select
              placeholder="Ajouter un tribunal"
              onChange={({ value }) => setSelectedTribunal(value)}
              options={tis
                .filter(
                  (ti) =>
                    !mandataire_tis.some((relation) => relation.ti.id === ti.id)
                )
                .map((ti) => ({ label: ti.etablissement, value: ti.id }))}
            />
          </Box>
          <Button
            onClick={() => {
              if (selectedTribunal) {
                addMandataireTribunalRelation({
                  refetchQueries: ["admin_mandataire_tis"],
                  variables: { mandataireId, tiId: selectedTribunal },
                });
              }
            }}
          >
            Ajouter
          </Button>
        </Flex>
      </FormInputBox>
    </Flex>
  );
};

export default AdminMandataireTribunaux;
