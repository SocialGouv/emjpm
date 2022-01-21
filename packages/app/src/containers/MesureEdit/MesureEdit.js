import { useMutation, useQuery } from "@apollo/client";
import { isMandataire, mesureFormatter } from "@emjpm/biz";
import { useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { MesureContext } from "~/containers/MesureContext";
import useUser from "~/hooks/useUser";
import { getUserBasePath } from "~/constants";
import { formatTribunauxOptions } from "~/formatters/tribunaux";

import { MesureEditForm } from "./MesureEditForm";
import { EDIT_MESURE } from "./mutations";
import { MANDATAIRE_TRIBUNAL, SERVICE_TRIBUNAL } from "./queries";
import { Helmet } from "react-helmet";

export function MesureEdit() {
  const history = useHistory();
  const mesureToEdit = useContext(MesureContext);

  const currentUser = useUser();

  const { service = {}, type } = currentUser;
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

  const redirectToMesure = (mesureId) =>
    history.push(`${userBasePath}/mesures/${mesureId}`);

  const [addOrUpdateMesure, { loading: loading1, error: error1 }] = useMutation(
    EDIT_MESURE,
    {
      onCompleted: ({ add_or_update }) => {
        const mesure = add_or_update.returning[0];
        redirectToMesure(mesure.id);
      },
    }
  );
  useQueryReady(loading1, error1);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    addOrUpdateMesure({
      awaitRefetchQueries: true,
      refetchQueries: ["MESURES_QUERY", "CURRENT_USER_QUERY"],
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
        ti_id: values.ti_id,
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

  const { formatNatureMesure, formatChampMesure } = mesureFormatter;

  return (
    <>
      <Helmet>
        <title>
          Modifier la mesure {formatNatureMesure(mesureToEdit.natureMesure)}{" "}
          {formatChampMesure(mesureToEdit.champMesure)} | e-MJPM
        </title>
      </Helmet>
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
    </>
  );
}
