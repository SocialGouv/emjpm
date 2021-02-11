import { useMemo } from "react";
import { useSubscription } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

import useQueryReady from "~/hooks/useQueryReady";
import { EnqueteReponse } from "~/containers/Enquete";
import { useCurrentStepFromUrl } from "~/containers/Enquete/EnqueteCommon";
import { ENQUETE_WITH_REPONSE_STATUS } from "~/containers/Enquete/queries";
import { LayoutServices } from "~/containers/Layout";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

function EnquetePage() {
  const query = useParams();
  const enqueteId = Number(query.enquete_id);

  const history = useHistory();
  const { id: userId } = useUser();

  const currentStep = useCurrentStepFromUrl();

  const { data, loading, error } = useSubscription(
    ENQUETE_WITH_REPONSE_STATUS,
    {
      variables: { enqueteId, userId },
    }
  );

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
        pathname: `/services/enquetes/${enquete.id}`,
        search: `?step=${step}&substep=${substep}`,
      });
      window.scrollTo(0, 0);
    }
  }

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <LayoutServices>
      <BoxWrapper>
        <EnqueteReponse
          enquete={enquete}
          enqueteReponse={enqueteReponse}
          currentStep={currentStep}
          navigateToStep={navigateToStep}
        />
      </BoxWrapper>
    </LayoutServices>
  );
}

export default EnquetePage;
