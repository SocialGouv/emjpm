import { useApolloClient, useMutation } from "@apollo/client";
import { isFrance } from "@emjpm/biz";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { MesureContext } from "~/containers/MesureContext";
import { MESURE_CONTEXT_QUERY } from "~/containers/MesureContext/queries";
import useUser from "~/hooks/useUser";
import { getUserBasePath } from "~/constants";
import getLocation from "~/query-service/emjpm-hasura/getLocation";

import { MesureAcceptForm } from "./MesureAcceptForm";
import { ACCEPT_MESURE } from "./mutations";
import { MesureAcceptStyle } from "./style";
import useQueryReady from "~/hooks/useQueryReady";

export function MesureAccept(props) {
  const history = useHistory();
  const client = useApolloClient();

  const mesure = useContext(MesureContext);
  const currentUser = useUser();

  const { service = {}, type } = currentUser;
  const { service_antennes = [] } = service;
  const { mandataireId, serviceId, id } = mesure;

  const userBasePath = getUserBasePath({ type });

  function redirectToMesure(mesureId) {
    history.push(`${userBasePath}/mesures/${mesureId}`);
  }

  const [updateMesure, { loading: loading2, error: error2 }] = useMutation(
    ACCEPT_MESURE,
    {
      onCompleted: async () => {
        redirectToMesure(mesure.id);
      },
    }
  );
  useQueryReady(loading2, error2);

  const antenneOptions = service_antennes.map((antenne) => ({
    label: antenne.name,
    value: antenne.id,
  }));

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

    const { en_attente_reouverture, mesure_en_attente_reouvertures = [] } =
      mesure;

    const {
      annee_naissance,
      cabinet,
      judgment_date,
      is_urgent,
      champ_mesure,
      nature_mesure,
      civilite,
    } = en_attente_reouverture
      ? mesure_en_attente_reouvertures[0]
      : {
          ...mesure,
          judgment_date: mesure.judgmentDate,
          is_urgent: mesure.isUrgent,
          champ_mesure: mesure.champMesure,
          nature_mesure: mesure.natureMesure,
        };

    await updateMesure({
      refetchQueries: [
        {
          query: MESURE_CONTEXT_QUERY,
          variables: {
            id: mesure.id,
          },
        },
        "MESURES_QUERY",
        "CURRENT_USER_QUERY",
      ],
      variables: {
        ...variables,
        antenne_id: values.antenne ? Number.parseInt(values.antenne) : null,
        date_nomination: values.date_nomination,
        id,
        lieu_vie: values.lieu_vie,
        pays: values.pays,
        mandataireId,
        serviceId,
        annee_naissance,
        cabinet,
        judgment_date,
        is_urgent,
        champ_mesure: champ_mesure ? champ_mesure : null,
        nature_mesure,
        civilite,
      },
    });
    setSubmitting(false);
  };

  function handleCancel() {
    redirectToMesure(mesure.id);
  }

  return (
    <Box sx={MesureAcceptStyle} {...props}>
      <MesureAcceptForm
        antenneOptions={antenneOptions}
        userBasePath={userBasePath}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        mt="3"
        mesure={mesure}
      />
    </Box>
  );
}

export default MesureAccept;
