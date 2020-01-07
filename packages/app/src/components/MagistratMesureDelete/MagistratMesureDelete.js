import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { Flex } from "rebass";

import { MagistratMesureDeleteForm } from "./MagistratMesureDeleteForm";
import { MESURE } from "./queries";
import { MagistratMesureRemoveStyle } from "./style";

export const MagistratMesureDelete = props => {
  const { mesureId } = props;

  const { data, loading, error } = useQuery(MESURE, {
    variables: {
      id: mesureId
    }
  });

  if (error) {
    return <div>error</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  const [mesure] = data.mesures;

  return (
    <Flex sx={MagistratMesureRemoveStyle}>
      <MagistratMesureDeleteForm mesure={mesure} />
    </Flex>
  );
};
