/* eslint-disable react/display-name */
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Heading4 } from "@emjpm/ui";
import { Checkbox, Label } from "@rebass/forms";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { DynamicTable, DynamicTableHeader } from "../DynamicTable";
import ErrorBox from "../ErrorBox";
import { CALCULATE_SERVICE_MESURES, DELETE_MESURES } from "./mutations";
import { MESURES } from "./queries";

const AdminServiceMesures = props => {
  const { serviceId } = props;
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = useMemo(
    () => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => {
          return (
            <Label>
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            </Label>
          );
        },
        Cell: ({ row }) => {
          const { checked, onChange } = row.getToggleRowSelectedProps();
          return (
            <Label>
              <Checkbox checked={checked} onChange={onChange} />
            </Label>
          );
        }
      },
      {
        Header: "Numéro RG",
        accessor: "numero_rg"
      },
      {
        Header: "Numéro de dossier",
        accessor: "numero_dossier"
      },
      {
        Header: "Date ouverture",
        accessor: data => format(new Date(data.date_ouverture), "dd/MM/yyy")
      },
      {
        Header: "Date de création",
        accessor: data => format(new Date(data.created_at), "dd/MM/yyy hh:mm")
      },
      {
        Header: "Tribunal",
        accessor: data => (data.ti ? data.ti.ville : "")
      },
      {
        Header: "Antenne",
        accessor: data => (data.service_antenne ? data.service_antenne.name : "")
      }
    ],
    []
  );

  const { data, loading } = useQuery(MESURES, {
    variables: {
      serviceId
    }
  });

  const [deleteMesures, { loading: mutationLoading }] = useMutation(DELETE_MESURES);
  const [calculateServiceMesures, { loading: calculateServiceMesuresLoading }] = useMutation(
    CALCULATE_SERVICE_MESURES
  );

  if (!data || loading) {
    return null;
  }

  const { mesures, services, service_antenne_aggregate, mesures_aggregate } = data;
  const { nodes: antennes } = service_antenne_aggregate;
  const {
    aggregate: { count: awaitingMesuresCount }
  } = mesures_aggregate;
  const inProgressMesuresCount = mesures.length;
  const [service] = services;
  const mustBeRecalculated =
    service &&
    (awaitingMesuresCount !== service.mesures_awaiting ||
      inProgressMesuresCount !== service.mesures_in_progress);

  return (
    <Box p={2}>
      {mustBeRecalculated && (
        <ErrorBox
          title="Oups, le nombre de mesures ne semble pas être à jour."
          message={`Mesures en cours: ${inProgressMesuresCount} • Mesures en attente: ${awaitingMesuresCount}`}
          buttonText="Recalculer"
          isLoading={calculateServiceMesuresLoading}
          onClick={() => {
            calculateServiceMesures({
              refetchQueries: [
                {
                  query: MESURES,
                  variables: {
                    serviceId: service.id
                  }
                }
              ],
              variables: {
                serviceId: service.id,
                inProgressMesuresCount,
                awaitingMesuresCount
              }
            });
          }}
        />
      )}

      <DynamicTableHeader
        onClick={() =>
          deleteMesures({
            refetchQueries: [{ query: MESURES, variables: { serviceId } }],
            variables: { ids: selectedRows.map(({ id }) => id) }
          })
        }
        buttonText="Supprimer"
        isLoading={mutationLoading}
        selectedItemsCount={Object.keys(selectedRows).length}
        buttonEnable={mesures.length !== 0 && Object.keys(selectedRows).length > 0}
        title={`Mesures (${service.mesures_in_progress} en cours • ${service.mesures_awaiting} en attente)`}
      />

      {antennes.length > 0 && (
        <Box mb={4}>
          <Heading4 mb={3}>Antennes</Heading4>
          {antennes.map((antenne, index) => {
            return (
              <Flex key={`antenne-${index}`}>
                <Text fontWeight="bold">{`- ${antenne.name}`}</Text>
                <Text ml={2}>
                  {`(${antenne.mesures_in_progress} en cours • ${antenne.mesures_awaiting} en attente)`}
                </Text>
              </Flex>
            );
          })}
        </Box>
      )}

      {mesures.length === 0 ? (
        <Text>Aucune mesure pour le mandataire sélectionné</Text>
      ) : (
        <DynamicTable
          columns={columns}
          data={mesures}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      )}
    </Box>
  );
};

export default AdminServiceMesures;
