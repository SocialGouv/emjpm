import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { GESTIONNAIRES } from "~/containers/MagistratMesureMandataire/queries";
import { MagistratMesureMandataireTitle } from "~/containers/MagistratMesureMandataireTitle";
import { MAGISTRAT_MESURES_QUERY } from "~/containers/MagistratMesures/queries";
import { MagistratMesureServiceTitle } from "~/containers/MagistratMesureServiceTitle";
import useUser from "~/hooks/useUser";
import { formatGestionnaireId } from "~/formatters/mandataires";

import { MagistratMesureAddForm } from "./MagistratMesureAddForm";
import {
  CALCULATE_MESURES,
  CHOOSE_MANDATAIRE,
  SEND_EMAIL_RESERVATION,
} from "./mutations";
import { MagistratMandataireStyle } from "./style";
import useQueryReady from "~/hooks/useQueryReady";

function MagistratMesureAdd(props) {
  const { gestionnaireId } = props;

  const history = useHistory();

  const {
    cabinet,
    magistrat: { ti_id: tiId, id: magistratId },
  } = useUser();

  const { mandataireId, serviceId } = formatGestionnaireId(gestionnaireId);

  const [sendEmailReservation, { loading: loading1, error: error1 }] =
    useMutation(SEND_EMAIL_RESERVATION);
  useQueryReady(loading1, error1);

  const [recalculateMesures, { loading: loading2, error: error2 }] =
    useMutation(CALCULATE_MESURES);
  useQueryReady(loading2, error2);

  const [chooseMandataire, { loading: loading3, error: error3 }] = useMutation(
    CHOOSE_MANDATAIRE,
    {
      onCompleted: async ({ insert_mesures }) => {
        const [mesure] = insert_mesures.returning;

        await recalculateMesures({
          awaitRefetchQueries: true,
          refetchQueries: [
            {
              query: GESTIONNAIRES,
              variables: {
                mandataire_id: mandataireId,
                service_id: serviceId,
              },
            },
            {
              query: MAGISTRAT_MESURES_QUERY,
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
        });

        await sendEmailReservation({
          variables: {
            mesure_id: mesure.id,
          },
        });

        await history.push(`/magistrats/mesures/${mesure.id}`);
      },
    }
  );
  useQueryReady(loading3, error3);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    await chooseMandataire({
      variables: {
        annee_naissance: values.annee_naissance,
        cabinet: values.cabinet,
        champ_mesure: values.champ_mesure ? values.champ_mesure : null,
        civilite: values.civilite,
        judgmentDate: values.judgmentDate === "" ? null : values.judgmentDate,
        magistrat_id: magistratId,
        mandataire_id: mandataireId,
        nature_mesure: values.nature_mesure,
        numero_rg: values.numero_rg,
        service_id: serviceId,
        ti: tiId,
        urgent: values.urgent,
      },
    });

    setSubmitting(false);
  };

  const cancelActionRoute = gestionnaireId
    ? {
        to: `/magistrats/gestionnaires/${gestionnaireId}`,
      }
    : {
        to: "/magistrats",
      };

  return (
    <Box>
      {serviceId && <MagistratMesureServiceTitle id={serviceId} />}
      {mandataireId && <MagistratMesureMandataireTitle id={mandataireId} />}
      <Box sx={MagistratMandataireStyle} {...props}>
        <MagistratMesureAddForm
          handleSubmit={handleSubmit}
          cancelActionRoute={cancelActionRoute}
          cabinet={cabinet}
        />
      </Box>
    </Box>
  );
}

export { MagistratMesureAdd };
