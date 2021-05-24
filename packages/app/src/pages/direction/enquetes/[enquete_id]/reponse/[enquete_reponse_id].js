import { DirectionEnqueteDetailsReponsePreview } from "~/containers/EnqueteDirection/DirectionEnqueteDetailsReponsePreview";
import { LayoutDirection } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function DirectionEnqueteReponsePreviewPage() {
  const { enquete_id, enquete_reponse_id } = useParams();
  const enqueteId = parseInt(enquete_id);
  const enqueteReponseId = parseInt(enquete_reponse_id);

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
}

export default DirectionEnqueteReponsePreviewPage;
