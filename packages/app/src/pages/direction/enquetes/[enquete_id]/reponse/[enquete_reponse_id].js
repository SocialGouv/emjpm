import React from "react";

import { DirectionEnqueteDetailsReponsePreview } from "~/components/EnqueteDirection/DirectionEnqueteDetailsReponsePreview";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const DirectionEnqueteReponsePreviewPage = () => {
  const query = useQuery();
  const enqueteId = Number(query.enquete_id);
  const enqueteReponseId = Number(query.enquete_reponse_id);

  return (
    <LayoutDirection>
      <BoxWrapper mt={1} px="1">
        <DirectionEnqueteDetailsReponsePreview
          enqueteId={enqueteId}
          enqueteReponseId={enqueteReponseId}
        />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default DirectionEnqueteReponsePreviewPage;
