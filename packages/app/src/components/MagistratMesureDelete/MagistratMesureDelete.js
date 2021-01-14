import { useContext } from "react";
import { Flex } from "rebass";

import { MesureContext } from "~/components/MesureContext";

import { MagistratMesureDeleteForm } from "./MagistratMesureDeleteForm";
import { MagistratMesureRemoveStyle } from "./style";

export function MagistratMesureDelete() {
  const mesure = useContext(MesureContext);

  return (
    <Flex sx={MagistratMesureRemoveStyle}>
      <MagistratMesureDeleteForm mesure={mesure} />
    </Flex>
  );
}
