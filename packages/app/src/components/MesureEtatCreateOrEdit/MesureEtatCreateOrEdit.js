import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/core";
import React from "react";
import { Box } from "rebass";

import { getLocation } from "../../query-service/LocationQueryService";
import { MESURE_CONTEXT_QUERY } from "../MesureContext/queries";
import { MESURES_QUERY } from "../MesureList/queries";
import { MesureEtatCreateOrEditForm } from "./MesureEtatCreateOrEditForm";
import { ADD_MESURE_ETAT, EDIT_MESURE_ETAT } from "./mutations";

export const MesureEtatCreateOrEdit = ({
  mesure,
  mesureEtat,
  onSuccess,
  onCancel,
}) => {
  const editMode = mesureEtat && mesureEtat.id ? true : false;
  if (!editMode) {
    mesureEtat = null;
  }

  const client = useApolloClient();

  const ADD_OR_UPDATE_MESURE_ETAT = editMode
    ? EDIT_MESURE_ETAT
    : ADD_MESURE_ETAT;

  const [addOrUpdateMesureEtat] = useMutation(ADD_OR_UPDATE_MESURE_ETAT, {
    onCompleted: async () => {
      onSuccess();
    },
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const variables = {
      id: mesureEtat?.id,
      mesure_id: mesure.id,
      champ_mesure: values?.champ_mesure || null,
      date_changement_etat: values.date_changement_etat,
      lieu_vie: values.lieu_vie,
      nature_mesure: values.nature_mesure,
      pays: values.pays,
      type_etablissement: values?.type_etablissement || null,
      code_postal: values.code_postal,
      ville: values.ville.toUpperCase(),
    };

    addOrUpdateMesureEtat({
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: MESURES_QUERY,
          variables: {
            antenne: null,
            limit: 20,
            natureMesure: null,
            offset: 0,
            searchText: null,
            status: MESURE_PROTECTION_STATUS.en_cours,
          },
        },
        {
          query: MESURE_CONTEXT_QUERY,
          variables: {
            id: mesure.id,
          },
        },
      ],
      variables,
    });

    setSubmitting(false);
  };

  const handleCancel = async () => {
    onCancel();
  };

  return (
    <Box px="2" mx="7" py="2" bg="cardSecondary">
      <MesureEtatCreateOrEditForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        mesureEtatToEdit={mesureEtat}
      />
    </Box>
  );
};
