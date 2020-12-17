/* eslint-disable react/display-name */
import { useMutation, useQuery } from "@apollo/react-hooks";
import { isEnAttente, isEnCours, isEteinte } from "@emjpm/core";
import { Select } from "@emjpm/ui";
import { Checkbox, Label } from "@rebass/forms";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { DynamicTable, DynamicTableHeader } from "~/components/DynamicTable";
import ErrorBox from "~/components/ErrorBox";
import {
  MESURE_STATUS_LABEL_VALUE_ATTENTE,
  MESURE_STATUS_LABEL_VALUE_EN_COURS,
  MESURE_STATUS_LABEL_VALUE_ETEINTE,
} from "~/constants/mesures";

import { CALCULATE_MANDATAIRE_MESURES, DELETE_MESURES } from "./mutations";
import { MESURES } from "./queries";

export const MESURES_OPTIONS = [
  MESURE_STATUS_LABEL_VALUE_EN_COURS,
  MESURE_STATUS_LABEL_VALUE_ATTENTE,
  MESURE_STATUS_LABEL_VALUE_ETEINTE,
];

const AdminMandataireMesures = (props) => {
  const { userId } = props;
  const [selectedRows, setSelectedRows] = useState([]);

  const [selectedMesureStatus, setSelectedMesureStatus] = useState(
    MESURE_STATUS_LABEL_VALUE_EN_COURS
  );

  const columns = useMemo(() => buildTableColumns(), []);

  const { data, loading } = useQuery(MESURES, {
    variables: {
      userId,
    },
  });

  const [deleteMesures, { loading: mutationLoading }] = useMutation(
    DELETE_MESURES
  );
  const [
    calculateMandataireMesures,
    { loading: calculateMandataireMesuresLoading },
  ] = useMutation(CALCULATE_MANDATAIRE_MESURES);

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

  const { mandataires } = data;

  const [mandataire] = mandataires;

  const mustBeRecalculated =
    mandataire &&
    (inProgressMesuresCount !== mandataire.mesures_en_cours ||
      awaitingMesuresCount !== mandataire.mesures_en_attente);

  return (
    <Box p={2}>
      {mustBeRecalculated && (
        <ErrorBox
          title="Oups, le nombre de mesures ne semble pas être à jour."
          message={`Mesures en cours: ${inProgressMesuresCount} • Mesures en attente: ${awaitingMesuresCount}`}
          buttonText="Recalculer"
          isLoading={calculateMandataireMesuresLoading}
          onClick={() =>
            calculateMandataireMesures({
              refetchQueries: [
                {
                  query: MESURES,
                  variables: {
                    userId,
                  },
                },
              ],
              variables: {
                awaitingMesuresCount,
                inProgressMesuresCount,
                userId,
              },
            })
          }
        />
      )}
      <DynamicTableHeader
        onClick={() =>
          deleteMesures({
            refetchQueries: [{ query: MESURES, variables: { userId } }],
            variables: { ids: selectedRows.map(({ id }) => id) },
          })
        }
        buttonText="Supprimer"
        isLoading={mutationLoading}
        selectedItemsCount={Object.keys(selectedRows).length}
        buttonEnable={
          filteredMesures.length !== 0 && Object.keys(selectedRows).length > 0
        }
        title={
          mandataire
            ? `Mesures (${mandataire.mesures_en_cours} en cours • ${mandataire.mesures_en_attente} en attente • ${extinctionMesuresCount} éteintes)`
            : "Mesures"
        }
      />
      <Flex flexDirection="row">
        <Box width="200px">
          <Select
            instanceId={"mandataire-mesure-statut-filter"}
            size="small"
            placeholder="filter par statut"
            onChange={(status) => setSelectedMesureStatus(status)}
            value={selectedMesureStatus}
            options={MESURES_OPTIONS}
          />
        </Box>
      </Flex>

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
};

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
      Header: "n°  dossier",
      accessor: "numero_dossier",
    },
    {
      Header: "Code postal",
      accessor: "code_postal",
    },
    {
      Header: "Ville",
      accessor: "ville",
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
      Header: "Année",
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

export default AdminMandataireMesures;
