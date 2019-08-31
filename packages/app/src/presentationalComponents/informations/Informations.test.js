import React from "react";
import { Informations } from "./Informations";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Informations />).toJSON();
  expect(tree).toMatchSnapshot();
});
