import { useQuery } from "@apollo/react-hooks";
import dynamic from "next/dynamic";
import React from "react";
import { Box, Flex } from "rebass";

import { MagistratMapMandatairesPanel } from "../MagistratMapMandatairesPanel";
import { MapContextProvider } from "./context";
import { MESURES_GESTIONNAIRE } from "./queries";
import { MagistratMandatairesMapStyle } from "./style";

const formatData = view_mesure_gestionnaire => {
  return view_mesure_gestionnaire.map(gestionnaire => {
    return {
      ...gestionnaire
    };
  });
};

const MagistratMapMandataires = dynamic(
  () => import("./MagistratMapMandataires").then(mod => mod.MagistratMapMandataires),
  { ssr: false }
);

const MagistratMandataires = props => {
  const {
    magistrat: { ti_id }
  } = props;

  const { data, error, loading } = useQuery(MESURES_GESTIONNAIRE, {
    variables: {
      tiId: ti_id
    },
    fetchPolicy: "network-only"
  });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const { view_mesure_gestionnaire } = data;
  const datas = formatData(view_mesure_gestionnaire);

  return (
    <MapContextProvider>
      <Flex sx={MagistratMandatairesMapStyle()}>
        <Box height="100%" flex="0 1 auto">
          <MagistratMapMandatairesPanel tiId={ti_id} />
        </Box>
        <Box height="100%" flex="1 1 auto">
          <MagistratMapMandataires view_mesure_gestionnaire={datas} />
        </Box>
      </Flex>
    </MapContextProvider>
  );
};

export { MagistratMandataires };
