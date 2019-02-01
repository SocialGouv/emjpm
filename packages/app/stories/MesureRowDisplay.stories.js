import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { default as TableRowMesure, TableRowMesureView } from "../src/components/mandataireComponents/TableRowMesure";

storiesOf("MesuresCreation", module)
  .add("ShowMesure", () => (
    <TableRowMesureView
      date_ouverture={"10/12/2010"}
      type={"curatelle"}
      code_postal={28110}
      ville={"LeBelfort"}
      civilite={"H"}
      annee={"2010"}

    />
  ))
  .add("ShowMesurewithModal", () => (
    <TableRowMesureView
      date_ouverture={"10/12/2010"}
      type={"curatelle"}
      code_postal={28110}
      ville={"LeBelfort"}
      civilite={"H"}
      annee={"2010"}
      isOpen={true}
    />
  ));
