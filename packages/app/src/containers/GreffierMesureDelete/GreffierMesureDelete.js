import { useContext } from "react";
import { Flex } from "rebass";

import { MesureContext } from "~/containers/MesureContext";

import { GreffierMesureDeleteForm } from "./GreffierMesureDeleteForm";
import { GreffierMesureRemoveStyle } from "./style";

export function GreffierMesureDelete() {
  const mesure = useContext(MesureContext);

  return (
    <Flex sx={GreffierMesureRemoveStyle}>
      <GreffierMesureDeleteForm mesure={mesure} />
    </Flex>
  );
}
