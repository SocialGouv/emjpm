import { useMutation } from "@apollo/client";

import { Box } from "rebass";

import { MESURE_CONTEXT_QUERY } from "~/containers/MesureContext/queries";

import { MesureRessourceCreateOrEditForm } from "./MesureRessourceCreateOrEditForm";
import {
  DELETE_MESURE_RESSOURCE,
  INSERT_MESURE_RESSOURCE,
  UPDATE_MESURE_RESSOURCE,
} from "./mutations";
import useQueryReady from "~/hooks/useQueryReady";

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

  const [updateMesureRessource, { loading: loading1, error: error1 }] =
    useMutation(UPDATE_MESURE_RESSOURCE, {
      onCompleted: async () => {
        onSuccess();
      },
    });
  useQueryReady(loading1, error1);

  const [insertMesureRessource, { loading: loading2, error: error2 }] =
    useMutation(INSERT_MESURE_RESSOURCE, {
      onCompleted: async () => {
        onSuccess();
      },
    });
  useQueryReady(loading2, error2);

  const [deleteMesureRessource, { loading: loading3, error: error3 }] =
    useMutation(DELETE_MESURE_RESSOURCE, {
      onCompleted: async () => {
        onSuccess();
      },
    });
  useQueryReady(loading3, error3);

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
        "MESURES_QUERY",
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
        "MESURES_QUERY",
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

  function handleDelete() {
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
  }

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
