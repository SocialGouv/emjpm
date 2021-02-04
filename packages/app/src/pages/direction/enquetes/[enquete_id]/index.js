import { DirectionEnqueteDetailsReponsesList } from "~/containers/EnqueteDirection/DirectionEnqueteDetailsReponsesList";
import { LayoutDirection } from "~/containers/Layout";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function DirectionEnqueteDetailsPage() {
  const { enquete_id: enqueteId } = useParams();
  return (
    <LayoutDirection>
      <BoxWrapper mt={1} px="1">
        <DirectionEnqueteDetailsReponsesList enqueteId={enqueteId} />
      </BoxWrapper>
    </LayoutDirection>
  );
}

export default DirectionEnqueteDetailsPage;
