import React from "react";
import { FiltersContextProvider } from "../../src/components-v2/filters/context";
import { Filters } from "../../src/components-v2/filters";
import { LayoutDirection } from "../../src/components-v2/layout";

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
