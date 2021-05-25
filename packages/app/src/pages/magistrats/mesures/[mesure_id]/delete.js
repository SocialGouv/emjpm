import { Flex } from "rebass";

import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratMesureDelete } from "~/containers/MagistratMesureDelete";
import { MesureProvider } from "~/containers/MesureContext";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function MagistratMesureDeletePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

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
}

export default MagistratMesureDeletePage;
