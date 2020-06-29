import React from "react";
import { useMutation } from "react-apollo";

import { EnqueteSubmit } from "../EnqueteCommon";
import { ENQUETE_REPONSE_STATUS } from "../queries";
import { SUBMIT_ENQUETE_REPONSE } from "./mutations";

export const EnqueteIndividuelSubmit = (props) => {
  const { enquete, enqueteReponse, goToFirstPage } = props;

  const [submitEnqueteReponse, { loading }] = useMutation(SUBMIT_ENQUETE_REPONSE, {
    refetchQueries: [
      {
        query: ENQUETE_REPONSE_STATUS,
        variables: { enqueteId: enquete.id, reponseId: enqueteReponse.id },
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

export default EnqueteIndividuelSubmit;
