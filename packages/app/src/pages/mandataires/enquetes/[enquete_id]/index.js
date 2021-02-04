import { useContext, useMemo } from "react";
import { useSubscription } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

import { LoadingWrapper } from "~/containers/Commons";
import { EnqueteReponse } from "~/containers/Enquete";
import { useCurrentStepFromUrl } from "~/containers/Enquete/EnqueteCommon";
import { ENQUETE_WITH_REPONSE_STATUS } from "~/containers/Enquete/queries";
import { LayoutMandataire } from "~/containers/Layout";
import { UserContext } from "~/containers/UserContext";
import { BoxWrapper } from "~/components/Grid";

function MandataireEnquetePage() {
  const history = useHistory();
  const { id: userId } = useContext(UserContext);
  const currentStep = useCurrentStepFromUrl();

  const query = useParams();
  const enqueteId = Number(query.enquete_id);

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

  const errorCode = useMemo(() => (!loading && !enquete ? 404 : undefined), [
    enquete,
    loading,
  ]);

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

  return (
    <LayoutMandataire hasFooterMargins={false}>
      <BoxWrapper>
        <LoadingWrapper loading={loading} error={error} errorCode={errorCode}>
          <EnqueteReponse
            enquete={enquete}
            enqueteReponse={enqueteReponse}
            currentStep={currentStep}
            navigateToStep={navigateToStep}
          />
        </LoadingWrapper>
      </BoxWrapper>
    </LayoutMandataire>
  );
}

export default MandataireEnquetePage;
