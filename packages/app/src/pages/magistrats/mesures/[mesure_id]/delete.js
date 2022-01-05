import { Flex } from "rebass";

import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratMesureDelete } from "~/containers/MagistratMesureDelete";
import { MesureProvider } from "~/containers/MesureContext";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function MagistratMesureDeletePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <Helmet>
        <title>Supprimer la mesure {mesure_id} | e-MPJM</title>
      </Helmet>
      <LayoutMagistrat>
        <BoxWrapper mt="6" px="1">
          <Flex flexWrap="wrap" mt="2">
            <MesureProvider mesureId={mesureId}>
              <MagistratMesureDelete />
            </MesureProvider>
          </Flex>
        </BoxWrapper>
      </LayoutMagistrat>
    </>
  );
}

export default MagistratMesureDeletePage;
