import { BoxWrapper } from "@emjpm/ui";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";
import { useQuery } from "react-apollo";
import { resetIdCounter } from "react-tabs";

import { LoadingWrapper } from "../../../../src/components/Commons";
import { EnqueteReponse } from "../../../../src/components/Enquete";
import { useCurrentStepFromUrl } from "../../../../src/components/Enquete/EnqueteCommon";
import { ENQUETE_WITH_REPONSE_STATUS } from "../../../../src/components/Enquete/queries";
import { LayoutMandataire } from "../../../../src/components/Layout";
import { UserContext } from "../../../../src/components/UserContext";
import { withAuthSync } from "../../../../src/util/auth";

const MandataireEnquetePage = ({ enqueteId }) => {
  const router = useRouter();
  const { id: userId } = useContext(UserContext);
  const currentStep = useCurrentStepFromUrl();

  const { data, loading, error } = useQuery(ENQUETE_WITH_REPONSE_STATUS, {
    variables: { enqueteId, userId },
  });

  const { enquete, enqueteReponse } = useMemo(() => {
    const enquete = data ? data.enquetes_by_pk : {};
    const enqueteReponse = data ? data.enquete_reponse_validation_status : {};
    return { enquete, enqueteReponse };
  }, [data]);

  const errorCode = useMemo(() => (!loading && !enquete ? 404 : undefined), [enquete, loading]);

  async function navigateToStep({ step, substep }) {
    if (step === undefined || substep === undefined) {
      return;
    }
    if (step !== currentStep.step || substep !== currentStep.substep) {
      await router.push("/mandataires/enquetes/[enquete_id]", {
        pathname: `/mandataires/enquetes/${enquete.id}`,
        query: { step, substep },
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
};

MandataireEnquetePage.getInitialProps = async (params) => {
  const { query } = params;
  resetIdCounter();
  return { enqueteId: Number(query.enquete_id) };
};

export default withAuthSync(MandataireEnquetePage);
