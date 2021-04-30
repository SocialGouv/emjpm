import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { isFrance, isMandataire } from "@emjpm/biz";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import useUser from "~/hooks/useUser";
import { getUserBasePath } from "~/constants";
import getLocation from "~/query-service/emjpm-hasura/getLocation";
import { formatTribunauxOptions } from "~/formatters/tribunaux";
import useQueryReady from "~/hooks/useQueryReady";

import { MesureCreateForm } from "./MesureCreateForm";
import { ADD_MESURE, CALCULATE_MESURES } from "./mutations";
import { MANDATAIRE_TRIBUNAL, SERVICE_TRIBUNAL } from "./queries";

export function MesureCreate() {
  const history = useHistory();

  const client = useApolloClient();
  const currentUser = useUser();

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
    history.push(`${userBasePath}/mesures/${mesureId}`);

  const [addMesure] = useMutation(ADD_MESURE, {
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

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const variables = {};

    if (isFrance(values.pays)) {
      const location = await getLocation(client, {
        city: values.ville,
        zipcode: values.code_postal,
      });

      if (!location || !location.department) {
        setErrors({
          zipcode: "Le code postal semble invalide.",
        });
        return setSubmitting(false);
      } else {
        const { department, geolocation } = location;
        variables.code_postal = values.code_postal;
        variables.ville = values.ville.toUpperCase();
        variables.latitude = geolocation ? geolocation.latitude : null;
        variables.longitude = geolocation ? geolocation.longitude : null;
        variables.departement_code = department.id;
      }
    }

    addMesure({
      awaitRefetchQueries: true,
      refetchQueries: ["MESURES_QUERY"],
      variables: {
        ...variables,
        annee_naissance: values.annee_naissance.toString(),
        antenne_id: values.antenne ? Number.parseInt(values.antenne) : null,
        cabinet: values.cabinet,
        champ_mesure: values.champ_mesure ? values.champ_mesure : null,
        civilite: values.civilite,
        date_nomination: values.date_nomination,
        date_premier_mesure: values.date_premier_mesure,
        date_protection_en_cours: values.date_nomination,
        lieu_vie: values.lieu_vie,
        nature_mesure: values.nature_mesure,
        numero_dossier: values.numero_dossier,
        numero_rg: values.numero_rg,
        pays: values.pays,
        ti_id: values.ti_id,
        type_etablissement: values.type_etablissement
          ? values.type_etablissement
          : null,
      },
    });

    setSubmitting(false);
  };

  const handleCancel = async () => {
    history.push(userBasePath);
  };

  const antenneOptions = service_antennes.map((antenne) => ({
    label: antenne.name,
    value: antenne.id,
  }));

  return (
    <Box m="1" mt="2" p="0">
      <MesureCreateForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        tribunaux={tribunaux}
        antenneOptions={antenneOptions}
        userBasePath={userBasePath}
      />
    </Box>
  );
}
