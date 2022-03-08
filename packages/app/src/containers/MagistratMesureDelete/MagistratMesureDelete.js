import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Flex } from "rebass";

import { mesureFormatter } from "@emjpm/biz";
import { MesureContext } from "~/containers/MesureContext";

import { MagistratMesureDeleteForm } from "./MagistratMesureDeleteForm";
import { MagistratMesureRemoveStyle } from "./style";

export function MagistratMesureDelete() {
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
      <Flex
        sx={MagistratMesureRemoveStyle}
        id="magistrat_mesure_form_delete"
        tabIndex="-1"
      >
        <MagistratMesureDeleteForm mesure={mesure} />
      </Flex>{" "}
    </>
  );
}
