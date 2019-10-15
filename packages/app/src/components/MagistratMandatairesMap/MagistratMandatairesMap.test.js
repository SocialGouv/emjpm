import React from "react";
import { MagistratMandatairesMap } from "./MagistratMandatairesMap";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMandatairesMap />).toJSON();
  expect(tree).toMatchSnapshot();
});
