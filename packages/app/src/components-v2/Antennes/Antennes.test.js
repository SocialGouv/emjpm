import React from "react";
import { Antennes } from "./Antennes";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Antennes />).toJSON();
  expect(tree).toMatchSnapshot();
});
