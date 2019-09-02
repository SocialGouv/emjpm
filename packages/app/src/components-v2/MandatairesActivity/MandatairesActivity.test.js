import React from "react";
import { MandatairesActivity } from "./MandatairesActivity";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesActivity />).toJSON();
  expect(tree).toMatchSnapshot();
});
