import { DirectionEnqueteDetailsReponsesList } from "~/components/EnqueteDirection/DirectionEnqueteDetailsReponsesList";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

const DirectionEnqueteDetailsPage = () => {
  const { enquete_id: enqueteId } = useParams();
  return (
    <LayoutDirection>
      <BoxWrapper mt={1} px="1">
        <DirectionEnqueteDetailsReponsesList enqueteId={enqueteId} />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default DirectionEnqueteDetailsPage;
