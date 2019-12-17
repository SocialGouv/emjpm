import React from "react";
import renderer from "react-test-renderer";

import { ServiceMesureDelete } from "./ServiceMesureDelete";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesureDelete />).toJSON();
  expect(tree).toMatchSnapshot();
});
