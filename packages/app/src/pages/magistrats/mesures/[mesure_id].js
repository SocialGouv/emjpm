import { Flex } from "rebass";
import { Helmet } from "react-helmet";

import { LayoutMagistrat } from "~/containers/Layout";
import { MagistratMesure } from "~/containers/MagistratMesure";
import { MagistratMesureMandataire } from "~/containers/MagistratMesureMandataire";
import { MesureProvider } from "~/containers/MesureContext";
import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { BoxWrapper } from "~/components/Grid";
import { SkipToContent } from "~/components";

import { useParams } from "react-router-dom";

function Mandataires() {
  const { mesure_id } = useParams();
  const mesureId = parseInt(mesure_id);
  return (
    <>
      <Helmet>
        <title>Votre mesure {mesure_id} | e-MJPM</title>
      </Helmet>
      <SkipToContent skipTo="magistrat_mesure_details" />
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
    </>
  );
}

export default Mandataires;
