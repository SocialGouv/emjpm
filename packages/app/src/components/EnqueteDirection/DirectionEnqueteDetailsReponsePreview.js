import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Box } from "rebass";

import { Breadcrumb, LoadingWrapper } from "../Commons";
import { EnqueteReponse } from "../Enquete";
import { useCurrentStepFromUrl } from "../Enquete/EnqueteCommon";
import { ENQUETE_WITH_REPONSE_STATUS } from "../Enquete/queries";

export const DirectionEnqueteDetailsReponsePreview = ({
  enqueteId,
  enqueteReponseId,
}) => {
  const router = useRouter();
  const currentStep = useCurrentStepFromUrl();

  const { data, loading, error } = useQuery(ENQUETE_WITH_REPONSE_STATUS, {
    variables: { enqueteId, reponseId: enqueteReponseId },
  });

  const {
    enquete,
    enqueteLabel,
    reponseLabel,
    enqueteReponse,
  } = useMemo(() => {
    const enquete = data ? data.enquetes_by_pk : {};
    const enqueteReponse = data ? data.enquete_reponse_validation_status : {};
    const enqueteLabel = !enquete.annee
      ? ""
      : `Enquête ${enquete.annee} sur l'activité de ${enquete.annee - 1}`;
    const reponseLabel = formatReponseLabel(enqueteReponse);
    return { enquete, enqueteLabel, enqueteReponse, reponseLabel };
  }, [data]);

  const errorCode = useMemo(() => (!loading && !enquete ? 404 : undefined), [
    enquete,
    loading,
  ]);

  return (
    <LoadingWrapper
      error={error}
      loading={loading}
      errorRedirect={{ url: "/direction/enquetes" }}
      errorCode={errorCode}
    >
      <Breadcrumb
        crumbs={[
          {
            href: "/direction/enquetes",
            label: "Enquêtes",
          },
          {
            as: `/direction/enquetes/${enqueteId}`,
            href: "/direction/enquetes/[enquete_id]",
            label: enqueteLabel,
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
    </LoadingWrapper>
  );

  async function navigateToStep({ step, substep }) {
    if (step === undefined || substep === undefined) {
      return;
    }
    if (step !== currentStep.step || substep !== currentStep.substep) {
      await router.push(
        "/direction/enquetes/[enquete_id]/reponse/[enquete_reponse_id]",
        {
          pathname: `/direction/enquetes/${enqueteId}/reponse/${enqueteReponseId}`,
          query: { step, substep },
        }
      );
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
      return `Service`;
  }
  return "";
}

function formatName({ nom, prenom }) {
  return `${nom ? nom.toUpperCase() : ""} ${prenom}`;
}
