import React from "react";
import { ServiceEditAntenne } from "./ServiceEditAntenne";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceEditAntenne />).toJSON();
  expect(tree).toMatchSnapshot();
});
