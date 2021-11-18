import { Flex } from "rebass";

import { LayoutGreffier } from "~/containers/Layout";
import { GreffierMesureDelete } from "~/containers/GreffierMesureDelete";
import { MesureProvider } from "~/containers/MesureContext";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function GreffierMesureDeletePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <LayoutGreffier>
      <BoxWrapper mt="6" px="1">
        <Flex flexWrap="wrap" mt="2">
          <MesureProvider mesureId={mesureId}>
            <GreffierMesureDelete />
          </MesureProvider>
        </Flex>
      </BoxWrapper>
    </LayoutGreffier>
  );
}

export default GreffierMesureDeletePage;
