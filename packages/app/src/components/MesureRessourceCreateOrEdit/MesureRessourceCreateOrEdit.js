import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/biz";
import React from "react";
import { Box } from "rebass";

import { MESURE_CONTEXT_QUERY } from "~/components/MesureContext/queries";
import { MESURES_QUERY } from "~/components/MesureList/queries";

import { MesureRessourceCreateOrEditForm } from "./MesureRessourceCreateOrEditForm";
import { DELETE_MESURE_RESSOURCE, UPSERT_MESURE_RESSOURCE } from "./mutations";

export const MesureRessourceCreateOrEdit = ({
  mesure,
  mesureRessource,
  onSuccess,
  onCancel,
  ...props
}) => {
  const editMode = mesureRessource && mesureRessource.id ? true : false;
  if (!editMode) {
    mesureRessource = null;
  }

  const [upsertMesureRessource] = useMutation(UPSERT_MESURE_RESSOURCE, {
    onCompleted: async () => {
      onSuccess();
    },
  });

  const [deleteMesureRessource] = useMutation(DELETE_MESURE_RESSOURCE, {
    onCompleted: async () => {
      onSuccess();
    },
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const ressourceWithSameDate = mesure?.mesureRessources?.find(
      (elm) => elm.dateChangementRessource === values.date_changement_ressource
    );
    if (
      ressourceWithSameDate &&
      ressourceWithSameDate.id !== mesureRessource?.id
    ) {
      setErrors({
        date_changement_ressource:
          "la date de changement d'état doit être unique",
      });
    } else {
      const variables = {
        annee: values.annee,
        id: mesureRessource?.id,
        mesure_id: mesure.id,
        niveau_ressource: values.niveau_ressource,
        prestations_sociales: values.prestations_sociales.map((v) => ({
          prestations_sociales: v,
        })),
      };

      console.log({ variables });

      upsertMesureRessource({
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
    deleteMesureRessource({
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
        id: mesureRessource.id,
        mesure_id: mesure.id,
      },
    });
  };

  const handleCancel = async () => {
    onCancel();
  };

  return (
    <Box px="2" mx="7" py="2" {...props}>
      <MesureRessourceCreateOrEditForm
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        mesureRessourceToEdit={mesureRessource}
        isDeletable={mesure?.mesureRessources?.length > 1}
      />
    </Box>
  );
};
