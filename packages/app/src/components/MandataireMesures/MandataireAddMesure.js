import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React, { useContext, useMemo } from "react";

import { UserContext } from "../../components/UserContext";
import { MESURE_STATUS_LABEL_VALUE } from "../../constants/mesures";
import { getLocation } from "../../query-service/LocationQueryService";
import { formatTribunauxOptions } from "../../util";
import { MandataireAddMesureForm } from "./MandataireAddMesureForm";
import { ADD_MESURE, RECALCULATE_MANDATAIRE_MESURES } from "./mutations";
import { MANDATAIRE, MANDATAIRE_MESURES, USER_TRIBUNAL } from "./queries";

export const MandataireAddMesure = () => {
  const client = useApolloClient();

  const user = useContext(UserContext);
  const { id, mandataire } = user;

  const { loading, error, data } = useQuery(USER_TRIBUNAL, {
    variables: {
      id
    }
  });
  const tribunaux = useMemo(() => (data ? formatTribunauxOptions(data.user_tis) : []), [data]);
  const [recalculateMandataireMesures] = useMutation(RECALCULATE_MANDATAIRE_MESURES);
  const [addMesure] = useMutation(ADD_MESURE, {
    onCompleted: async () => {
      await recalculateMandataireMesures({
        variables: { mandataire_id: mandataire.id },
        refetchQueries: [
          "mesures",
          "mesures_aggregate",
          {
            query: MANDATAIRE,
            variables: { id: mandataire.id }
          }
        ]
      });
      await Router.push("/mandataires", { shallow: true });
    }
  });

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur...</div>;
  }

  return (
    <MandataireAddMesureForm
      tribunaux={tribunaux}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const variables = {};

        if (values.country.value === "FR") {
          const location = await getLocation(client, {
            zipcode: values.zipcode,
            city: values.city
          });

          if (!location || !location.department) {
            setErrors({
              zipcode: `Le code postal semble invalide.`
            });
            return setSubmitting(false);
          } else {
            const { department, geolocation } = location;
            variables.code_postal = values.zipcode;
            variables.ville = values.city.toUpperCase();
            variables.latitude = geolocation ? geolocation.latitude : "";
            variables.longitude = geolocation ? geolocation.longitude : "";
            variables.department_id = department.id;
          }
        }

        await addMesure({
          refetchQueries: [
            {
              query: MANDATAIRE_MESURES,
              variables: {
                limit: 20,
                offset: 0,
                searchText: null,
                status: MESURE_STATUS_LABEL_VALUE[0].value,
                type: null,
                excludeStatus: "Mesure en attente"
              }
            }
          ],
          variables: {
            ...variables,
            annee: values.annee.toString(),
            civilite: values.civilite.value,
            date_ouverture: values.date_ouverture,
            numero_dossier: values.numero_dossier,
            numero_rg: values.numero_rg,
            residence: values.residence.value,
            ti_id: values.tribunal.value,
            type: values.type.value,
            mandataireId: mandataire.id,
            pays: values.country.value,
            cabinet: values.cabinet
          }
        });

        setSubmitting(false);
      }}
    />
  );
};

export default MandataireAddMesure;
