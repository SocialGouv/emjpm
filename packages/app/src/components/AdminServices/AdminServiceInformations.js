import { useMutation, useQuery } from "@apollo/react-hooks";
import { Card, Select, Text } from "@emjpm/ui";
import React, { useState } from "react";
import { Box, Button, Flex } from "rebass";

import { ADD_SERVICE_TIS, DELETE_SERVICE_TIS } from "./mutations";
import { SERVICE } from "./queries";

const AdminServiceInformations = (props) => {
  const { serviceId } = props;
  const [selectedTribunal, setSelectedTribunal] = useState(undefined);
  const { data, loading, error } = useQuery(SERVICE, { variables: { serviceId } });
  const [deleteServiceTribunalRelation] = useMutation(DELETE_SERVICE_TIS);
  const [addServiceTribunalRelation] = useMutation(ADD_SERVICE_TIS);

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const [service] = data.services;
  const { id, etablissement, code_postal, ville, service_tis, service_members } = service;

  return (
    <Card>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          ID
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{id}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Etablissement
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{etablissement}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Code postal
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{code_postal}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Ville
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Text>{ville}</Text>
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Membres du service
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          {service_members &&
            service_members.map(({ user }) => {
              return (
                <Flex mb={10} alignItems="center" justifyContent="space-between" key={user.id}>
                  <Text>{`${user.nom} ${user.prenom} > #${user.id} > ${user.email}`}</Text>
                </Flex>
              );
            })}
        </Box>
      </Flex>
      <Flex mb={4}>
        <Box width={1 / 3} p={2} bg="cardSecondary">
          Tribunaux
        </Box>
        <Box width={2 / 3} px={4} py={2}>
          <Box>
            {service_tis &&
              service_tis.map((relation) => {
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
                          deleteServiceTribunalRelation({
                            variables: { id },
                            refetchQueries: ["admin_service"],
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
                  options={data.tis
                    .filter((ti) => !service_tis.some((relation) => relation.ti.id === ti.id))
                    .map((ti) => ({ label: ti.etablissement, value: ti.id }))}
                />
              </Box>
              <Button
                onClick={() => {
                  if (selectedTribunal) {
                    addServiceTribunalRelation({
                      refetchQueries: ["admin_service"],
                      variables: { serviceId, tiId: selectedTribunal },
                    });
                  }
                }}
              >
                Ajouter
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export { AdminServiceInformations };
