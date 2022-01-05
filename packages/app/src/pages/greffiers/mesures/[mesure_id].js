import { Flex } from "rebass";

import { LayoutGreffier } from "~/containers/Layout";
import { GreffierMesure } from "~/containers/GreffierMesure";
import { GreffierMesureMandataire } from "~/containers/GreffierMesureMandataire";
import { MesureProvider } from "~/containers/MesureContext";
import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function Mandataires() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);
  return (
    <>
      <Helmet>
        <title>Mesure {mesure_id} | e-MPJM</title>
      </Helmet>
      <LayoutGreffier initialValues={{ natureMesure: DEFAULT_MESURE_NATURE }}>
        <BoxWrapper mt={3} px="1">
          <Flex
            sx={{
              flexWrap: "wrap",
              mt: "2",
            }}
          >
            <MesureProvider mesureId={mesureId}>
              <GreffierMesure />
              <GreffierMesureMandataire />
            </MesureProvider>
          </Flex>
        </BoxWrapper>
      </LayoutGreffier>
    </>
  );
}

export default Mandataires;
