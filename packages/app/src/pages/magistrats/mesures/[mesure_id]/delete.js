import React from "react";
import { Flex } from "rebass";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratMesureDelete } from "~/components/MagistratMesureDelete";
import { MesureProvider } from "~/components/MesureContext";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

const MagistratMesureDeletePage = () => {
  const { mesure_id: mesureId } = useParams();

  return (
    <LayoutMagistrat>
      <BoxWrapper mt="6" px="1">
        <Flex flexWrap="wrap" mt="2">
          <MesureProvider mesureId={mesureId}>
            <MagistratMesureDelete />
          </MesureProvider>
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
};

export default MagistratMesureDeletePage;
