import React from "react";
import { MandatairesDisponibility } from "./MandatairesDisponibility";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesDisponibility />).toJSON();
  expect(tree).toMatchSnapshot();
});
