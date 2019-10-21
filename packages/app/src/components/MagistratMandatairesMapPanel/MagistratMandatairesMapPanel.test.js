import React from "react";
import { MagistratMandatairesMapPanel } from "./MagistratMandatairesMapPanel";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMandatairesMapPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
