import React from "react";
import renderer from "react-test-renderer";

import { ServiceEditAntenne } from "./ServiceEditAntenne";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceEditAntenne />).toJSON();
  expect(tree).toMatchSnapshot();
});
