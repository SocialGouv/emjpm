/* eslint-disable react/display-name */
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Checkbox, Label } from "@rebass/forms";
import { Button, Heading3 } from "@socialgouv/emjpm-ui-core";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { DynamicTable } from "../DynamicTable";
import ErrorBox from "../ErrorBox";
import { CALCULATE_MANDATAIRE_MESURES, DELETE_MESURES } from "./mutations";
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

const AdminUsersMesures = props => {
  const { userId } = props;
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

  const { mesures, mandataires } = data;
  const [mandataire] = mandataires;
  const { awaitingMesuresCount, inProgressMesuresCount } = getMesuresStatusCount(mesures);

  const mustBeRecalculated =
    mandataire &&
    (inProgressMesuresCount !== mandataire.mesures_en_cours ||
      awaitingMesuresCount !== mandataire.mesures_en_attente);

  return (
    <Box>
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
                id: userId,
                inProgressMesuresCount,
                awaitingMesuresCount
              }
            })
          }
        />
      )}

      <Flex my={3} justifyContent="space-between" alignItems="center">
        <Box>
          <Heading3
            mb={3}
          >{`Mesures (${mandataire.mesures_en_cours} en cours • ${mandataire.mesures_en_attente} en attente)`}</Heading3>
        </Box>
        {mesures.length !== 0 && (
          <Box>
            <Button
              isLoading={mutationLoading}
              onClick={async () => {
                const ids = selectedRows.map(({ id }) => id);
                await deleteMesures({
                  refetchQueries: [{ query: MESURES, variables: { userId } }],
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

export default AdminUsersMesures;
