import React from "react";

import { storiesOf } from "@storybook/react";

import PanelFilterMandataires from "../src/components/PanelFilterMandataires";

storiesOf("Mandataires", module).add("PanelFilters", () => (
  <PanelFilterMandataires updateFilters={() => {}} findPostcode={() => {}} />
));
