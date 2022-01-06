import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";
import { EnqueteReponse } from "~/containers/Enquete";
import { useCurrentStepFromUrl } from "~/containers/Enquete/EnqueteCommon";
import { ENQUETE_WITH_REPONSE_STATUS } from "~/containers/Enquete/queries";
import { LayoutMandataire } from "~/containers/Layout";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";

function MandataireEnquetePage() {
  const history = useHistory();
  const { id: userId } = useUser();
  const currentStep = useCurrentStepFromUrl();

  const { enquete_id } = useParams();
  const enqueteId = parseInt(enquete_id);

  const { data, loading, error } = useQuery(ENQUETE_WITH_REPONSE_STATUS, {
    variables: { enqueteId, userId },
  });

  const { enquete, enqueteReponse } = useMemo(() => {
    const enquete = data ? data.enquetes_by_pk : {};
    const enqueteReponse = data ? data.enquete_reponse_validation_status : {};
    return { enquete, enqueteReponse };
  }, [data]);

  async function navigateToStep({ step, substep }) {
    if (step === undefined || substep === undefined) {
      return;
    }
    if (step !== currentStep.step || substep !== currentStep.substep) {
      await history.push({
        pathname: `/mandataires/enquetes/${enquete.id}`,
        search: `?step=${step}&substep=${substep}`,
      });
      window.scrollTo(0, 0);
    }
  }

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Enquête {enquete_id} | e-MJPM</title>
      </Helmet>
      <LayoutMandataire>
        <BoxWrapper>
          <EnqueteReponse
            enquete={enquete}
            enqueteReponse={enqueteReponse}
            currentStep={currentStep}
            navigateToStep={navigateToStep}
          />
        </BoxWrapper>
      </LayoutMandataire>
    </>
  );
}

export default MandataireEnquetePage;
