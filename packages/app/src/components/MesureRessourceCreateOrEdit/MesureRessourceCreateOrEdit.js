import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION_STATUS } from "@emjpm/biz";
import React from "react";
import { Box } from "rebass";

import { MESURE_CONTEXT_QUERY } from "~/components/MesureContext/queries";
import { MESURES_QUERY } from "~/components/MesureList/queries";

import { MesureRessourceCreateOrEditForm } from "./MesureRessourceCreateOrEditForm";
import {
  DELETE_MESURE_RESSOURCE,
  INSERT_MESURE_RESSOURCE,
  UPDATE_MESURE_RESSOURCE,
} from "./mutations";

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

  const [updateMesureRessource] = useMutation(UPDATE_MESURE_RESSOURCE, {
    onCompleted: async () => {
      onSuccess();
    },
  });

  const [insertMesureRessource] = useMutation(INSERT_MESURE_RESSOURCE, {
    onCompleted: async () => {
      onSuccess();
    },
  });

  const [deleteMesureRessource] = useMutation(DELETE_MESURE_RESSOURCE, {
    onCompleted: async () => {
      onSuccess();
    },
  });

  const handleInsert = async (values) => {
    const variables = {
      annee: values.annee,
      mesure_id: mesure.id,
      niveau_ressource: values.niveau_ressource,
      prestations_sociales: values.prestations_sociales.map((v) => ({
        prestations_sociales: v,
      })),
    };
    insertMesureRessource({
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
  };
  const handleUpdate = async (values) => {
    const variables = {
      annee: values.annee,
      id: mesureRessource.id,
      niveau_ressource: values.niveau_ressource,
      prestations_sociales: values.prestations_sociales.map((v) => v),
      prestations_sociales_insert_input: values.prestations_sociales.map(
        (prestations_sociales) => ({
          mesure_ressources_id: mesureRessource.id,
          prestations_sociales,
        })
      ),
    };
    updateMesureRessource({
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
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (mesureRessource) {
      handleUpdate(values);
    } else {
      handleInsert(values);
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
      />
    </Box>
  );
};
