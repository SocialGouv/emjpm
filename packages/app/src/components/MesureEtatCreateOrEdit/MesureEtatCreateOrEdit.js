import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/core";
import React from "react";
import { Box } from "rebass";

import { MESURE_CONTEXT_QUERY } from "../MesureContext/queries";
import { MESURES_QUERY } from "../MesureList/queries";
import { MesureEtatCreateOrEditForm } from "./MesureEtatCreateOrEditForm";
import { DELETE_MESURE_ETAT, UPSERT_MESURE_ETAT } from "./mutations";

export const MesureEtatCreateOrEdit = ({
  mesure,
  mesureEtat,
  onSuccess,
  onCancel,
  ...props
}) => {
  const editMode = mesureEtat && mesureEtat.id ? true : false;
  if (!editMode) {
    mesureEtat = null;
  }

  const [upsertMesureEtat] = useMutation(UPSERT_MESURE_ETAT, {
    onCompleted: async () => {
      onSuccess();
    },
  });

  const [deleteMesureEtat] = useMutation(DELETE_MESURE_ETAT, {
    onCompleted: async () => {
      onSuccess();
    },
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const etatWithSameDate = mesure?.mesureEtats?.find(
      (elm) => elm.dateChangementEtat === values.date_changement_etat
    );
    if (etatWithSameDate && etatWithSameDate.id !== mesureEtat?.id) {
      setErrors({
        date_changement_etat: "la date de changement d'état doit être unique",
      });
    } else {
      const variables = {
        champ_mesure: values?.champ_mesure || null,
        code_postal: values.code_postal,
        date_changement_etat: values.date_changement_etat,
        id: mesureEtat?.id,
        lieu_vie: values.lieu_vie,
        mesure_id: mesure.id,
        nature_mesure: values.nature_mesure,
        pays: values.pays,
        type_etablissement: values?.type_etablissement || null,
        ville: values.ville?.toUpperCase(),
      };

      upsertMesureEtat({
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
    }

    setSubmitting(false);
  };

  const handleDelete = () => {
    deleteMesureEtat({
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: MESURE_CONTEXT_QUERY,
          variables: {
            id: mesure.id,
          },
        },
      ],
      variables: {
        id: mesureEtat.id,
        mesure_id: mesure.id,
      },
    });
  };

  const handleCancel = async () => {
    onCancel();
  };

  return (
    <Box px="2" mx="7" py="2" {...props}>
      <MesureEtatCreateOrEditForm
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        mesureEtatToEdit={mesureEtat}
        isDeletable={mesure?.mesureEtats?.length > 1}
      />
    </Box>
  );
};
