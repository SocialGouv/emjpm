import React from "react";
import renderer from "react-test-renderer";

import { MandataireMesureDelete } from "./MandataireMesureDelete";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMesureDelete />).toJSON();
  expect(tree).toMatchSnapshot();
});
