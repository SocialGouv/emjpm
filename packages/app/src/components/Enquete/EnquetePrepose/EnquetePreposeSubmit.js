import React from "react";
import { useMutation } from "react-apollo";

import { EnqueteSubmit } from "../EnqueteCommon";
import { ENQUETE_REPONSE_STATUS } from "../queries";
import { SUBMIT_ENQUETE_REPONSE } from "./mutations";

export const EnquetePreposeSubmit = (props) => {
  const { enquete, enqueteReponse, userId, goToFirstPage } = props;

  const [submitEnqueteReponse, { loading }] = useMutation(SUBMIT_ENQUETE_REPONSE, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId: enquete.id, userId },
      },
    ],
  });

  return (
    <EnqueteSubmit
      loading={loading}
      enquete={enquete}
      enqueteReponse={enqueteReponse}
      goToFirstPage={goToFirstPage}
      submitEnqueteReponse={submitEnqueteReponse}
    />
  );
};

export default EnquetePreposeSubmit;
