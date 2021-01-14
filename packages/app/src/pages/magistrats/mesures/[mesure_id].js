import { Flex } from "rebass";

import { LayoutMagistrat } from "~/components/Layout";
import { MagistratMesure } from "~/components/MagistratMesure";
import { MagistratMesureMandataire } from "~/components/MagistratMesureMandataire";
import { MesureProvider } from "~/components/MesureContext";
import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

function Mandataires() {
  const { mesure_id: mesureId } = useParams();
  return (
    <LayoutMagistrat initialValues={{ natureMesure: DEFAULT_MESURE_NATURE }}>
      <BoxWrapper mt={6} px="1">
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
