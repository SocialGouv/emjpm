import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Box, Flex } from "rebass";
import dynamic from "next/dynamic";

import { MagistratMapMandataireList } from "../MagistratMapMandataireList";
import { MagistratMandatairesMapStyle } from "./style";
import { MESURES_GESTIONNAIRE } from "./queries";

const formatData = view_mesure_gestionnaire => {
  return view_mesure_gestionnaire.map(gestionnaire => {
    return {
      ...gestionnaire,
      latitude: 48.866667 + Math.random() - Math.random(),
      longitude: 2.333333 - Math.random() + Math.random()
    };
  });
};

const MagistratMandatairesMap = dynamic(
  () => import("./MagistratMandatairesMap").then(mod => mod.MagistratMandatairesMap),
  { ssr: false }
);

const MagistratMandataires = props => {
  const {
    magistrat: { ti_id }
  } = props;

  const { data, error, loading } = useQuery(
    MESURES_GESTIONNAIRE,
    {
      variables: {
        tiId: ti_id
      }
    },
    {
      fetchPolicy: "network-only"
    }
  );

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }
  const { view_mesure_gestionnaire } = data;
  const datas = formatData(view_mesure_gestionnaire);

  return (
    <Flex sx={MagistratMandatairesMapStyle()}>
      <Box height="100%" flex="0 1 auto">
        <MagistratMapMandataireList />
      </Box>
      <Box height="100%" flex="1 1 auto">
        <MagistratMandatairesMap view_mesure_gestionnaire={datas} />
      </Box>
    </Flex>
  );
};

export { MagistratMandataires };
