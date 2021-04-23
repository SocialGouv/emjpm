import { Flex } from "rebass";

import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratMesure } from "~/containers/MagistratMesure";
import { MagistratMesureMandataire } from "~/containers/MagistratMesureMandataire";
import { MesureProvider } from "~/containers/MesureContext";
import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function Mandataires() {
  const { mesure_id: mesureId } = useParams();
  return (
    <LayoutMagistrat initialValues={{ natureMesure: DEFAULT_MESURE_NATURE }}>
      <BoxWrapper mt={3} px="1">
        <Flex
          sx={{
            flexWrap: "wrap",
            mt: "2",
          }}
        >
          <MesureProvider mesureId={mesureId}>
            <MagistratMesure />
            <MagistratMesureMandataire />
          </MesureProvider>
        </Flex>
      </BoxWrapper>
    </LayoutMagistrat>
  );
}

export default Mandataires;
