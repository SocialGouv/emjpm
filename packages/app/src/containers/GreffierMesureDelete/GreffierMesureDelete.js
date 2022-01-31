import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Flex } from "rebass";

import { mesureFormatter } from "@emjpm/biz";
import { MesureContext } from "~/containers/MesureContext";

import { GreffierMesureDeleteForm } from "./GreffierMesureDeleteForm";
import { GreffierMesureRemoveStyle } from "./style";

export function GreffierMesureDelete() {
  const mesure = useContext(MesureContext);
  const { natureMesure, champMesure, numeroRg } = mesure;
  const { formatNatureMesure, formatChampMesure } = mesureFormatter;

  return (
    <>
      <Helmet>
        <title>
          {`Supprimer la mesure ${formatNatureMesure(
            natureMesure
          )} ${formatChampMesure(champMesure)} ${numeroRg}`}{" "}
          | e-MJPM
        </title>
      </Helmet>
      <Flex sx={GreffierMesureRemoveStyle}>
        <GreffierMesureDeleteForm mesure={mesure} />
      </Flex>
    </>
  );
}
