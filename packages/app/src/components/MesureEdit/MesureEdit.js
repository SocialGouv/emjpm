import { useMutation, useQuery } from "@apollo/client";
import { isMandataire, MESURE_PROTECTION_STATUS } from "@emjpm/biz";
import React, { useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { MesureContext } from "~/components/MesureContext";
import { MESURES_QUERY } from "~/components/MesureList/queries";
import { UserContext } from "~/components/UserContext";
import { getUserBasePath } from "~/constants";
import { formatTribunauxOptions } from "~/util";

import { MesureEditForm } from "./MesureEditForm";
import { CALCULATE_MESURES, EDIT_MESURE } from "./mutations";
import { MANDATAIRE_TRIBUNAL, SERVICE_TRIBUNAL } from "./queries";

export const MesureEdit = () => {
  const history = useHistory();
  const mesureToEdit = useContext(MesureContext);

  const currentUser = useContext(UserContext);

  const { service = {}, type, mandataire } = currentUser;
  const { service_antennes = [] } = service;

  const userBasePath = getUserBasePath({ type });

  const GET_TRIBUNAL = isMandataire({ type })
    ? MANDATAIRE_TRIBUNAL
    : SERVICE_TRIBUNAL;

  const { loading, error, data } = useQuery(GET_TRIBUNAL);

  const tribunaux = useMemo(
    () => (data ? formatTribunauxOptions(data.tribunaux) : []),
    [data]
  );

  const [recalculateMesures] = useMutation(CALCULATE_MESURES);

  const redirectToMesure = (mesureId) =>
    history.push(
      `${userBasePath}/mesures/[mesure_id]`,
      `${userBasePath}/mesures/${mesureId}`,
      {
        shallow: true,
      }
    );

  const [addOrUpdateMesure] = useMutation(EDIT_MESURE, {
    onCompleted: async ({ add_or_update }) => {
      const mesure = add_or_update.returning[0];
      await recalculateMesures({
        refetchQueries: ["CURRENT_USER_QUERY"],
        variables: {
          mandataireId: mandataire ? mandataire.id : null,
          serviceId: service ? service.id : null,
        },
      });
      redirectToMesure(mesure.id);
    },
  });

  if (loading) {
    return <Box p={1}>Chargement...</Box>;
  }

  if (error) {
    return <Box p={1}>Erreur...</Box>;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    addOrUpdateMesure({
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
      ],
      variables: {
        annee_naissance: values.annee_naissance.toString(),
        antenne_id: values.antenne ? Number.parseInt(values.antenne) : null,
        cabinet: values.cabinet,
        civilite: values.civilite,
        date_nomination: values.date_nomination,
        date_premier_mesure: values.date_premier_mesure,
        date_protection_en_cours: values.date_protection_en_cours,
        id: mesureToEdit.id,
        numero_dossier: values.numero_dossier,
        numero_rg: values.numero_rg,
        ti_id: values.tribunal.value,
      },
    });

    setSubmitting(false);
  };

  const handleCancel = async () => {
    redirectToMesure(mesureToEdit.id);
  };

  const antenneOptions = service_antennes.map((antenne) => ({
    label: antenne.name,
    value: antenne.id,
  }));

  return (
    <Box m="1" mt="2" p="0">
      <MesureEditForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        tribunaux={tribunaux}
        antenneOptions={antenneOptions}
        mesureToEdit={mesureToEdit}
        userBasePath={userBasePath}
      />
    </Box>
  );
};
