import React from "react";

import { storiesOf } from "@storybook/react";

import { TableRowMesureView } from "../src/components/mandataireComponents/TableRowMesure";
import { CIVILITE_MONSIEUR } from "../src/util/mesures";

storiesOf("MesuresCreation", module)
  .add("ShowMesure", () => (
    <TableRowMesureView
      date_ouverture={"10/12/2010"}
      type={"curatelle"}
      code_postal={28110}
      ville={"LeBelfort"}
      civilite={CIVILITE_MONSIEUR}
      annee={"2010"}
    />
  ))
  .add("ShowMesurewithModal", () => (
    <TableRowMesureView
      date_ouverture={"10/12/2010"}
      type={"curatelle"}
      code_postal={28110}
      ville={"LeBelfort"}
      civilite={CIVILITE_MONSIEUR}
      annee={"2010"}
      isOpen={true}
    />
  ));
