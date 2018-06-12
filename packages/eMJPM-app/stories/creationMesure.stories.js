import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { default as MesureInput, FormMesure } from "../src/components/mandataireComponents/CreationMesure";


storiesOf("MesuresCreation", module).add("PanelCreation", () => (
  <MesureInput updateFilters={() => {}} findPostcode={() => {}} />
));
