/* eslint-disable react/display-name */
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Checkbox, Label } from "@rebass/forms";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { Box, Text } from "rebass";

import { DynamicTable, DynamicTableHeader } from "../DynamicTable";
import ErrorBox from "../ErrorBox";
import { CALCULATE_MANDATAIRE_MESURES, DELETE_MESURES } from "./mutations";
import { MESURES } from "./queries";

const AdminUsersMesures = props => {
  const { userId } = props;
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
      }
    ],
    []
  );

  const { data, loading } = useQuery(MESURES, {
    variables: {
      userId
    }
  });

  const [deleteMesures, { loading: mutationLoading }] = useMutation(DELETE_MESURES);
  const [calculateMandataireMesures, { loading: calculateMandataireMesuresLoading }] = useMutation(
    CALCULATE_MANDATAIRE_MESURES
  );

  if (!data || loading) {
    return null;
  }

  const { mesures, mandataires, mesures_aggregate } = data;
  const [mandataire] = mandataires;
  const {
    aggregate: { count: awaitingMesuresCount }
  } = mesures_aggregate;
  const inProgressMesuresCount = mesures.length;
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
                    userId
                  }
                }
              ],
              variables: {
                userId,
                inProgressMesuresCount,
                awaitingMesuresCount
              }
            })
          }
        />
      )}

      <DynamicTableHeader
        onClick={() =>
          deleteMesures({
            refetchQueries: [{ query: MESURES, variables: { userId } }],
            variables: { ids: selectedRows.map(({ id }) => id) }
          })
        }
        buttonText="Supprimer"
        isLoading={mutationLoading}
        selectedItemsCount={Object.keys(selectedRows).length}
        buttonEnable={mesures.length !== 0 && Object.keys(selectedRows).length > 0}
        title={
          mandataire
            ? `Mesures (${mandataire.mesures_en_cours} en cours • ${mandataire.mesures_en_attente} en attente)`
            : "Mesures"
        }
      />

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

export default AdminUsersMesures;
