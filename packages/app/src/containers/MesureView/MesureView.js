import { isEnCours } from "@emjpm/biz";
import { useContext } from "react";

import { MesureContext } from "~/containers/MesureContext";
import { Card } from "~/components";

import { MesureDetailView } from "./MesureDetailView";
import { MesureEtatViewList } from "./MesureEtatViewList";
import { MesureRessourceViewList } from "./MesureRessourceViewList";

export function MesureView(props) {
  const mesure = useContext(MesureContext);

  return (
    <Card p={4} {...props} id="mesure_view" tabIndex="0">
      <MesureDetailView mesure={mesure} px="3" pt="1" />

      {isEnCours(mesure) && (
        <MesureEtatViewList mesure={mesure} px="3" pt="1" />
      )}

      {isEnCours(mesure) && (
        <MesureRessourceViewList mesure={mesure} px="3" pt="1" />
      )}
    </Card>
  );
}

export default MesureView;
