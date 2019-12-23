import React from "react";
import renderer from "react-test-renderer";

import { ServiceMap } from "./ServiceMap";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMap />).toJSON();
  expect(tree).toMatchSnapshot();
});
