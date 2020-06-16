import React from "react";
import { useMutation } from "react-apollo";

import { EnqueteSubmit } from "../EnqueteCommon";
import { ENQUETE_REPONSE_STATUS } from "../queries";
import { SUBMIT_ENQUETE } from "./mutations";

export const EnqueteIndividuelSubmit = (props) => {
  const { enquete, enqueteReponse, userId, goToFirstPage } = props;

  const [submitEnquete, { loading }] = useMutation(SUBMIT_ENQUETE, {
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
      submitEnquete={submitEnquete}
    />
  );
};

export default EnqueteIndividuelSubmit;
