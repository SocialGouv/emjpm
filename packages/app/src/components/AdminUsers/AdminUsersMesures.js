/* eslint-disable react/display-name */
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Checkbox, Label } from "@rebass/forms";
import { Button, Heading3 } from "@socialgouv/emjpm-ui-core";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import { Box, Flex, Text } from "rebass";

import { PaginationTable } from "../PaginationTable";
import { DELETE_MESURES } from "./mutations";
import { MESURES } from "./queries";

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
        Header: "Résidence",
        accessor: "residence"
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
        accessor: data => format(new Date(data.created_at), "dd/MM/yyy")
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

  if (!data || loading) {
    return null;
  }

  const { mesures } = data;
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Heading3 mb={3}>Mesures</Heading3>
        </Box>
        <Box>
          {mesures.length !== 0 && (
            <Button
              isLoading={mutationLoading}
              onClick={async () => {
                const ids = selectedRows.map(({ id }) => id);
                await deleteMesures({ variables: { ids } });
              }}
            >
              Supprimer
            </Button>
          )}
        </Box>
      </Flex>

      {mesures.length === 0 ? (
        <Text>Aucune mesure pour le mandataire sélectionné</Text>
      ) : (
        <PaginationTable
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
