import React from "react";
import renderer from "react-test-renderer";

import { MagistratMapMandatairesPanel } from "./MagistratMapMandatairesPanel";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMapMandatairesPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
