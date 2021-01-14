import { useContext, useMemo } from "react";
import { useSubscription } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

import { LoadingWrapper } from "~/components/Commons";
import { EnqueteReponse } from "~/components/Enquete";
import { useCurrentStepFromUrl } from "~/components/Enquete/EnqueteCommon";
import { ENQUETE_WITH_REPONSE_STATUS } from "~/components/Enquete/queries";
import { LayoutServices } from "~/components/Layout";
import { UserContext } from "~/components/UserContext";
import { BoxWrapper } from "~/ui";

const EnquetePage = () => {
  const query = useParams();
  const enqueteId = Number(query.enquete_id);

  const history = useHistory();
  const { id: userId } = useContext(UserContext);

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

  const errorCode = useMemo(() => (!loading && !enquete ? 404 : undefined), [
    enquete,
    loading,
  ]);

  return (
    <LayoutServices>
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
    </LayoutServices>
  );

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
};

export default EnquetePage;
