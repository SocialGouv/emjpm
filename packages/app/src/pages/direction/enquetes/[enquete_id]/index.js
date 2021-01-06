import React from "react";

import { DirectionEnqueteDetailsReponsesList } from "~/components/EnqueteDirection/DirectionEnqueteDetailsReponsesList";
import { LayoutDirection } from "~/components/Layout";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const DirectionEnqueteDetailsPage = () => {
  const { enquete_id: enqueteId } = useQuery();
  return (
    <LayoutDirection>
      <BoxWrapper mt={1} px="1">
        <DirectionEnqueteDetailsReponsesList enqueteId={enqueteId} />
      </BoxWrapper>
    </LayoutDirection>
  );
};

export default DirectionEnqueteDetailsPage;
