import { DirectionEnqueteDetailsReponsesList } from "~/containers/EnqueteDirection/DirectionEnqueteDetailsReponsesList";
import { LayoutDirection } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function DirectionEnqueteDetailsPage() {
  const { enquete_id } = useParams();
  const enqueteId = parseInt(enquete_id);

  return (
    <LayoutDirection>
      <BoxWrapper mt={1} px="1">
        <DirectionEnqueteDetailsReponsesList enqueteId={enqueteId} />
      </BoxWrapper>
    </LayoutDirection>
  );
}

export default DirectionEnqueteDetailsPage;
