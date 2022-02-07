import { useParams } from "react-router-dom";
import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutGreffier } from "~/containers/Layout";
import { GreffierMesureDelete } from "~/containers/GreffierMesureDelete";
import { MesureProvider } from "~/containers/MesureContext";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

function GreffierMesureDeletePage() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);

  return (
    <>
      <Helmet>
        <title>Supprimer la mesure {mesure_id} | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="delete_mesure" />
      <LayoutGreffier>
        <BoxWrapper mt="6" px="1">
          <Flex flexWrap="wrap" mt="2">
            <MesureProvider mesureId={mesureId}>
              <GreffierMesureDelete />
            </MesureProvider>
          </Flex>
        </BoxWrapper>
      </LayoutGreffier>
    </>
  );
}

export default GreffierMesureDeletePage;
