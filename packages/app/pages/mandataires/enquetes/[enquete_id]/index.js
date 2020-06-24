import { BoxWrapper } from "@emjpm/ui";
import React, { useContext, useMemo } from "react";
import { useQuery } from "react-apollo";
import { resetIdCounter } from "react-tabs";

import { LoadingWrapper } from "../../../../src/components/Commons";
import { EnqueteReponse } from "../../../../src/components/Enquete";
import { ENQUETE_WITH_REPONSE_STATUS } from "../../../../src/components/Enquete/queries";
import { LayoutMandataire } from "../../../../src/components/Layout";
import { UserContext } from "../../../../src/components/UserContext";
import { withAuthSync } from "../../../../src/util/auth";
import { useUrlQueryValues } from "../../../../src/util/url";

const MandataireEnquetePage = ({ enqueteId }) => {
  const { id: userId } = useContext(UserContext);
  const { step, substep } = useUrlQueryValues([
    {
      defaultValue: 0,
      name: "step",
      type: "integer",
    },
    {
      defaultValue: 0,
      name: "substep",
      type: "integer",
    },
  ]);

  const { data, loading, error } = useQuery(ENQUETE_WITH_REPONSE_STATUS, {
    variables: { enqueteId, userId },
  });

  const { enquete, enqueteReponse } = useMemo(() => {
    const enquete = data ? data.enquetes_by_pk : {};
    const enqueteReponse = data ? data.enquete_reponse_validation_status : {};
    return { enquete, enqueteReponse };
  }, [data]);

  const currentStep = { step, substep };

  const errorCode = useMemo(() => (!loading && !enquete ? 404 : undefined), [enquete, loading]);

  return (
    <LayoutMandataire hasFooterMargins={false}>
      <BoxWrapper>
        <LoadingWrapper loading={loading} error={error} errorCode={errorCode}>
          <EnqueteReponse
            userId={userId}
            enquete={enquete}
            enqueteReponse={enqueteReponse}
            currentStep={currentStep}
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
