import React from "react";
import { ServiceAntennes } from "./ServiceAntennes";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceAntennes />).toJSON();
  expect(tree).toMatchSnapshot();
});
