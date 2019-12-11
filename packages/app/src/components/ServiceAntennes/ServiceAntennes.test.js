import React from "react";
import renderer from "react-test-renderer";

import { ServiceAntennes } from "./ServiceAntennes";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceAntennes />).toJSON();
  expect(tree).toMatchSnapshot();
});
