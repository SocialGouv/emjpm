import { useMutation, useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";
import { toast } from "react-toastify";

import { GESTIONNAIRES } from "~/containers/GreffierMesureMandataire/queries";
import { GreffierMesureMandataireTitle } from "~/containers/GreffierMesureMandataireTitle";
import {
  GREFFIER_MESURES_QUERY,
  CHECK_MESURE_EXISTS_QUERY,
} from "~/containers/GreffierMesures/queries";
import { GreffierMesureServiceTitle } from "~/containers/GreffierMesureServiceTitle";
import useUser from "~/hooks/useUser";
import { formatGestionnaireId } from "~/formatters/mandataires";

import { GreffierMesureAddForm } from "./GreffierMesureAddForm";
import {
  CHOOSE_MANDATAIRE,
  REOPEN_MESURE,
  SEND_EMAIL_RESERVATION,
} from "./mutations";
import { GreffierMandataireStyle } from "./style";
import useQueryReady from "~/hooks/useQueryReady";

function GreffierMesureAdd(props) {
  const { gestionnaireId } = props;

  const history = useHistory();

  const {
    cabinet,
    greffier: { ti_id: tiId, id: greffierId },
  } = useUser();

  const { mandataireId, serviceId } = formatGestionnaireId(gestionnaireId);

  const [sendEmailReservation, { loading: loading1, error: error1 }] =
    useMutation(SEND_EMAIL_RESERVATION);
  useQueryReady(loading1, error1);

  const [reopenMesure, { loading: loading2, error: error2 }] = useMutation(
    REOPEN_MESURE,
    {
      refetchQueries: [
        {
          query: GESTIONNAIRES,
          variables: {
            mandataire_id: mandataireId,
            service_id: serviceId,
          },
        },
        {
          query: GREFFIER_MESURES_QUERY,
          variables: {
            natureMesure: null,
            offset: 0,
            searchText: null,
            tiId: tiId,
          },
        },
      ],
      variables: {
        mandataireId,
        serviceId,
      },
      onCompleted: async ({ insert_mesure_en_attente_reouverture }) => {
        const [mesure_en_attente_reouverture] =
          insert_mesure_en_attente_reouverture.returning;

        await sendEmailReservation({
          variables: {
            mesure_id: mesure_en_attente_reouverture.mesure_id,
          },
        });

        await history.push(
          `/greffiers/mesures/${mesure_en_attente_reouverture.mesure_id}`
        );
      },
    }
  );

  useQueryReady(loading2, error2);
  const [chooseMandataire, { loading: loading3, error: error3 }] = useMutation(
    CHOOSE_MANDATAIRE,
    {
      refetchQueries: [
        {
          query: GESTIONNAIRES,
          variables: {
            mandataire_id: mandataireId,
            service_id: serviceId,
          },
        },
        {
          query: GREFFIER_MESURES_QUERY,
          variables: {
            natureMesure: null,
            offset: 0,
            searchText: null,
            tiId: tiId,
          },
        },
      ],
      variables: {
        mandataireId,
        serviceId,
      },
      onCompleted: async ({ insert_mesures }) => {
        const [mesure] = insert_mesures.returning;

        await sendEmailReservation({
          variables: {
            mesure_id: mesure.id,
          },
        });

        await history.push(`/greffiers/mesures/${mesure.id}`);
      },
    }
  );
  useQueryReady(loading3, error3);

  const client = useApolloClient();

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const { data } = await client.query({
      query: CHECK_MESURE_EXISTS_QUERY,
      variables: {
        serviceId,
        mandataireId,
        tiId,
        numeroRG: values.numero_rg,
      },
    });

    if (data.mesures.length > 0) {
      const [mesure] = data.mesures;
      const { status } = mesure;
      if (status == "en_cours") {
        toast.error(
          "Il y a déjà une mesure en cours portant le même Numéro RG et rattaché à votre tribunal pour ce mandataire"
        );
        return;
      } else if (status == "en_attente") {
        toast.error(
          "Il y a déjà une mesure en attente portant le même Numéro RG et rattaché à votre tribunal pour ce mandataire"
        );
        return;
      } else if (status === "eteinte") {
        toast.info(
          "Il y a une mesure clôturée portant le même Numéro RG et rattaché à votre tribunal pour ce mandataire, elle sera réouverte"
        );
      } else {
        throw new Error("unexpected status");
      }
      await reopenMesure({
        variables: {
          mesure_id: mesure.id,
          annee_naissance: values.annee_naissance,
          cabinet: values.cabinet,
          champ_mesure: values.champ_mesure ? values.champ_mesure : null,
          civilite: values.civilite,
          judgmentDate: values.judgmentDate === "" ? null : values.judgmentDate,
          greffier_id: greffierId,
          mandataire_id: mandataireId,
          nature_mesure: values.nature_mesure,
          service_id: serviceId,
          ti: tiId,
          urgent: values.urgent,
          antenne_id: values.antenne,
        },
      });
      return;
    }

    await chooseMandataire({
      variables: {
        annee_naissance: values.annee_naissance,
        cabinet: values.cabinet,
        champ_mesure: values.champ_mesure ? values.champ_mesure : null,
        civilite: values.civilite,
        judgmentDate: values.judgmentDate === "" ? null : values.judgmentDate,
        greffier_id: greffierId,
        mandataire_id: mandataireId,
        nature_mesure: values.nature_mesure,
        numero_rg: values.numero_rg,
        service_id: serviceId,
        ti: tiId,
        urgent: values.urgent,
        antenne_id: values.antenne,
      },
    });

    setSubmitting(false);
  };

  const cancelActionRoute = gestionnaireId
    ? {
        to: `/greffiers/gestionnaires/${gestionnaireId}`,
      }
    : {
        to: "/greffiers",
      };

  return (
    <Box id="greffier_mesure_add">
      {serviceId && <GreffierMesureServiceTitle id={serviceId} />}
      {mandataireId && <GreffierMesureMandataireTitle id={mandataireId} />}
      <Box sx={GreffierMandataireStyle} {...props}>
        <GreffierMesureAddForm
          handleSubmit={handleSubmit}
          cancelActionRoute={cancelActionRoute}
          cabinet={cabinet}
          mandataireId={mandataireId}
          serviceId={serviceId}
        />
      </Box>
    </Box>
  );
}

export { GreffierMesureAdd };
