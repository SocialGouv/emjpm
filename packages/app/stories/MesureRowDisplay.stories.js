import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import {
  default as TableRowMesure,
  TableRowMesureView,
} from "../src/components/mandataireComponents/TableRowMesure";

storiesOf("MesuresCreation", module)
  .add("ShowMesure", () => (
    <TableRowMesureView
      date_nomination={"10/12/2010"}
      nature_mesure={"curatelle_simple"}
      champ_protection={"protection_bien"}
      code_postal={28110}
      ville={"LeBelfort"}
      civilite={"monsieur"}
      annee_naissance={"2010"}
    />
  ))
  .add("ShowMesurewithModal", () => (
    <TableRowMesureView
      date_nomination={"10/12/2010"}
      nature_mesure={"curatelle_simple"}
      champ_protection={"protection_personne"}
      code_postal={28110}
      ville={"LeBelfort"}
      civilite={"monsieur"}
      annee_naissance={"2010"}
      isOpen={true}
    />
  ));
