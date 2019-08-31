import React from "react";

import { FiltersContextProvider } from "../../src/components-v2/Filters/context";
import { Filters } from "../../src/components-v2/Filters";
import { LayoutDirection } from "../../src/components-v2/Layout";

const Mandataires = () => {
  return (
    <FiltersContextProvider>
      <LayoutDirection>
        <Filters />
      </LayoutDirection>
    </FiltersContextProvider>
  );
};

export default Mandataires;
