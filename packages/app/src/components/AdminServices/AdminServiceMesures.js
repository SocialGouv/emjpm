/* eslint-disable react/display-name */
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Checkbox, Label } from "@rebass/forms";
import { Button, Heading3 } from "@socialgouv/emjpm-ui-core";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { DynamicTable } from "../DynamicTable";
import ErrorBox from "../ErrorBox";
import { CALCULATE_SERVICE_MESURES, DELETE_MESURES } from "./mutations";
import { MESURES } from "./queries";

function getMesuresStatusCount(mesures) {
  let awaitingMesuresCount = 0;
  let inProgressMesuresCount = 0;
  for (const mesure of mesures) {
    const { status } = mesure;
    if (status === "Mesure en cours") {
      ++inProgressMesuresCount;
    } else if (status === "Mesure en attente") {
      ++awaitingMesuresCount;
    }
  }
  return {
    awaitingMesuresCount,
    inProgressMesuresCount
  };
}

const AdminServiceMesures = props => {
  const { serviceId } = props;
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = useMemo(
    () => [
      {
        id: "selection",
        Header: () => null,
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
        Header: "Statuts",
        accessor: "status"
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

  const { mesures, services } = data;
  const { awaitingMesuresCount, inProgressMesuresCount } = getMesuresStatusCount(mesures);
  const [service] = services;
  const mustBeRecalculated =
    service &&
    (awaitingMesuresCount !== service.mesures_awaiting ||
      inProgressMesuresCount !== service.mesures_in_progress);

  return (
    <Box>
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
                id: service.id,
                inProgressMesuresCount,
                awaitingMesuresCount
              }
            });
          }}
        />
      )}

      <Flex mb={3} justifyContent="space-between" alignItems="center">
        <Box>
          <Heading3
            mb={3}
          >{`Mesures (${service.mesures_in_progress} en cours • ${service.mesures_awaiting} en attente)`}</Heading3>
        </Box>
        {mesures.length !== 0 && (
          <Box>
            <Button
              isLoading={mutationLoading}
              onClick={async () => {
                const ids = selectedRows.map(({ id }) => id);
                await deleteMesures({
                  refetchQueries: [{ query: MESURES, variables: { serviceId } }],
                  variables: { ids }
                });
              }}
            >
              Supprimer
            </Button>
          </Box>
        )}
      </Flex>

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
