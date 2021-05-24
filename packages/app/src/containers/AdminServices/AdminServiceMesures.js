/* eslint-disable react/display-name */
import { useMutation, useQuery } from "@apollo/client";
import { isEnAttente, isEnCours, isEteinte } from "@emjpm/biz";
import { Checkbox, Label } from "@rebass/forms";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Text } from "rebass";

import { DynamicTable, DynamicTableHeader } from "~/containers/DynamicTable";
import {
  MESURE_STATUS_LABEL_VALUE_ATTENTE,
  MESURE_STATUS_LABEL_VALUE_EN_COURS,
  MESURE_STATUS_LABEL_VALUE_ETEINTE,
} from "~/constants/mesures";
import { Heading, Select } from "~/components";

import { DELETE_MESURES } from "./mutations";
import { MESURES } from "./queries";
import useQueryReady from "~/hooks/useQueryReady";

export const MESURES_OPTIONS = [
  MESURE_STATUS_LABEL_VALUE_EN_COURS,
  MESURE_STATUS_LABEL_VALUE_ATTENTE,
  MESURE_STATUS_LABEL_VALUE_ETEINTE,
];

function AdminServiceMesures() {
  const { service_id } = useParams();
  const serviceId = parseInt(service_id);
  const [selectedRows, setSelectedRows] = useState([]);

  const [selectedMesureStatus, setSelectedMesureStatus] = useState(
    MESURE_STATUS_LABEL_VALUE_EN_COURS
  );

  const columns = useMemo(() => buildTableColumns(), []);

  const { data, loading } = useQuery(MESURES, {
    variables: {
      serviceId,
    },
  });

  const [deleteMesures, { loading: mutationLoading, error: error2 }] =
    useMutation(DELETE_MESURES, {
      variables: {
        serviceId,
      },
      refetchQueries: [
        {
          variables: {
            serviceId,
          },
          query: MESURES,
        },
      ],
    });

  useQueryReady(mutationLoading, error2);

  const allMesures = useMemo(() => (data ? data.mesures : []), [data]);

  const {
    inProgressMesuresCount,
    awaitingMesuresCount,
    extinctionMesuresCount,
  } = useMemo(() => buildMesuresCounts(allMesures), [allMesures]);

  const filteredMesures = useMemo(
    () =>
      allMesures.filter(
        (mesure) => mesure.status === selectedMesureStatus.value
      ),
    [allMesures, selectedMesureStatus.value]
  );

  if (!data || loading) {
    return null;
  }

  const { services, service_antenne_aggregate } = data;
  const { nodes: antennes } = service_antenne_aggregate;

  const [service] = services;

  return (
    <Box p={2}>
      <DynamicTableHeader
        onClick={() =>
          deleteMesures({
            refetchQueries: [
              {
                query: MESURES,
                variables: { serviceId },
              },
            ],
            variables: { ids: selectedRows.map(({ id }) => id) },
          })
        }
        buttonText="Supprimer"
        isLoading={mutationLoading}
        selectedItemsCount={Object.keys(selectedRows).length}
        buttonEnable={
          filteredMesures.length !== 0 && Object.keys(selectedRows).length > 0
        }
        title={`Mesures (${service.mesures_in_progress} en cours • ${service.mesures_awaiting} en attente • ${extinctionMesuresCount} éteintes)`}
      />
      <Flex flexDirection="row">
        <Box width="200px">
          <Select
            instanceId={"service-mesure-statut-filter"}
            size="small"
            placeholder="filter par statut"
            onChange={(status) => setSelectedMesureStatus(status)}
            value={selectedMesureStatus}
            options={MESURES_OPTIONS}
          />
        </Box>
      </Flex>

      {antennes.length > 0 && (
        <Box mb={4}>
          <Heading size={4} mb={3}>
            Antennes
          </Heading>
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

      {filteredMesures.length === 0 ? (
        <Text>Aucune mesure pour le mandataire sélectionné</Text>
      ) : (
        <DynamicTable
          columns={columns}
          data={filteredMesures}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
        />
      )}
    </Box>
  );
}

function buildTableColumns() {
  return [
    {
      Cell: ({ row }) => {
        const { checked, onChange } = row.getToggleRowSelectedProps();
        return (
          <Label>
            <Checkbox checked={checked} onChange={onChange} />
          </Label>
        );
      },
      Header: ({ getToggleAllRowsSelectedProps }) => {
        return (
          <Label>
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          </Label>
        );
      },
      id: "selection",
    },
    {
      Header: "n° RG",
      accessor: "numero_rg",
    },
    {
      Header: "n° dossier",
      accessor: "numero_dossier",
    },
    {
      Header: "Nature",
      accessor: "nature_mesure",
    },
    {
      Header: "Protection",
      accessor: "champ_mesure",
    },
    {
      Header: "année",
      accessor: "annee_naissance",
    },
    {
      Header: "Date de nomination",
      accessor: (data) => format(new Date(data.date_nomination), "dd/MM/yyy"),
    },
    {
      Header: "Date de création",
      accessor: (data) => format(new Date(data.created_at), "dd/MM/yyy hh:mm"),
    },
    {
      Header: "Tribunal",
      accessor: (data) => (data.ti ? data.ti.ville : ""),
    },
    {
      Header: "Antenne",
      accessor: (data) =>
        data.service_antenne ? data.service_antenne.name : "",
    },
  ];
}

function buildMesuresCounts(allMesures) {
  return allMesures.reduce(
    (acc, mesure) => {
      const { status } = mesure;
      if (isEnAttente({ status })) {
        acc.awaitingMesuresCount++;
      }
      if (isEnCours({ status })) {
        acc.inProgressMesuresCount++;
      }
      if (isEteinte({ status })) {
        acc.extinctionMesuresCount++;
      }
      return acc;
    },
    {
      awaitingMesuresCount: 0,
      extinctionMesuresCount: 0,
      inProgressMesuresCount: 0,
    }
  );
}

export { AdminServiceMesures };
