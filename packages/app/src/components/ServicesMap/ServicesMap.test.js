import React from "react";
import renderer from "react-test-renderer";

import { ServicesMap } from "./ServicesMap";

it("renders correctly", () => {
  const tree = renderer.create(<ServicesMap />).toJSON();
  expect(tree).toMatchSnapshot();
});
