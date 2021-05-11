import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "rebass";

import { Breadcrumb } from "~/containers/Commons";
import { EnqueteReponse } from "~/containers/Enquete";
import { useCurrentStepFromUrl } from "~/containers/Enquete/EnqueteCommon";
import { ENQUETE_WITH_REPONSE_STATUS } from "~/containers/Enquete/queries";
import useQueryReady from "~/hooks/useQueryReady";
import useOnErrorRedirect from "~/hooks/useOnErrorRedirect";

export const DirectionEnqueteDetailsReponsePreview = ({
  enqueteId,
  enqueteReponseId,
}) => {
  const history = useHistory();
  const currentStep = useCurrentStepFromUrl();

  const { data, loading, error } = useQuery(ENQUETE_WITH_REPONSE_STATUS, {
    variables: { enqueteId, reponseId: enqueteReponseId },
  });

  const { enquete, enqueteLabel, reponseLabel, enqueteReponse } =
    useMemo(() => {
      const enquete = data ? data.enquetes_by_pk : {};
      const enqueteReponse = data ? data.enquete_reponse_validation_status : {};
      const enqueteLabel = !enquete.annee
        ? ""
        : `Enquête ${enquete.annee} sur l'activité de ${enquete.annee - 1}`;
      const reponseLabel = formatReponseLabel(enqueteReponse);
      return { enquete, enqueteLabel, enqueteReponse, reponseLabel };
    }, [data]);

  useOnErrorRedirect(error, "/direction/enquetes");
  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <div>
      <Breadcrumb
        crumbs={[
          {
            label: "Enquêtes",
            to: "/direction/enquetes",
          },
          {
            label: enqueteLabel,
            to: `/direction/enquetes/${enqueteId}`,
          },
          {
            label: reponseLabel,
          },
        ]}
      />
      <Box mt={2}>
        <EnqueteReponse
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          currentStep={currentStep}
          navigateToStep={navigateToStep}
        />
      </Box>
    </div>
  );

  async function navigateToStep({ step, substep }) {
    if (step === undefined || substep === undefined) {
      return;
    }
    if (step !== currentStep.step || substep !== currentStep.substep) {
      await history.push({
        pathname: `/direction/enquetes/${enqueteId}/reponse/${enqueteReponseId}`,
        search: `?step=${step}&substep=${substep}`,
      });
      window.scrollTo(0, 0);
    }
  }
};

function formatReponseLabel(enqueteReponse) {
  if (!enqueteReponse.user_type) {
    return "";
  }
  switch (enqueteReponse.user_type) {
    case "individuel":
      return `Mandataire individuel "${
        enqueteReponse.mandataire && enqueteReponse.mandataire?.user
          ? formatName({
              nom: enqueteReponse.mandataire.user.nom,
              prenom: enqueteReponse.mandataire.user.prenom,
            })
          : ""
      }"`;
    case "prepose":
      return `Mandataire préposé "${
        enqueteReponse.mandataire && enqueteReponse.mandataire?.user
          ? formatName({
              nom: enqueteReponse.mandataire.user.nom,
              prenom: enqueteReponse.mandataire.user.prenom,
            })
          : ""
      }"`;
    case "service":
      return "Service";
  }
  return "";
}

function formatName({ nom, prenom }) {
  return `${nom ? nom.toUpperCase() : ""} ${prenom}`;
}
