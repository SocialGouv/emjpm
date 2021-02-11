import { useMutation } from "@apollo/client";

import useUser from "~/hooks/useUser";

import { EnqueteSubmit } from "../EnqueteCommon";
import { ENQUETE_WITH_REPONSE_STATUS } from "../queries";
import { SUBMIT_ENQUETE_REPONSE } from "./mutations";

export function EnqueteServiceSubmit(props) {
  const { enquete, enqueteReponse, goToFirstPage } = props;
  const { id: enqueteId } = enquete;
  const { id: userId } = useUser();
  const [submitEnqueteReponse, { loading }] = useMutation(
    SUBMIT_ENQUETE_REPONSE,
    {
      onCompleted: () => {
        // TODO: it needs to be changed, but actually SUBMIT_ENQUETE_REPONSE
        // use useSubscription method with graphql query 🤷
        // The problem is refetchQueries doesn't works with useSubscription.
        document.location.reload(true);
      },
      refetchQueries: [
        {
          query: ENQUETE_WITH_REPONSE_STATUS,
          variables: { enqueteId, userId },
        },
      ],
    }
  );

  return (
    <EnqueteSubmit
      loading={loading}
      enquete={enquete}
      enqueteReponse={enqueteReponse}
      goToFirstPage={goToFirstPage}
      submitEnqueteReponse={submitEnqueteReponse}
    />
  );
}

export default EnqueteServiceSubmit;
