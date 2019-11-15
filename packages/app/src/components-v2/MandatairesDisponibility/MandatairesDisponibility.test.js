import React from "react";
import renderer from "react-test-renderer";

import { MandatairesDisponibility } from "./MandatairesDisponibility";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesDisponibility />).toJSON();
  expect(tree).toMatchSnapshot();
});
