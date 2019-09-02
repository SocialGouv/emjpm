import React from "react";
import { MandatairesCapacity } from "./MandatairesCapacity";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesCapacity />).toJSON();
  expect(tree).toMatchSnapshot();
});
