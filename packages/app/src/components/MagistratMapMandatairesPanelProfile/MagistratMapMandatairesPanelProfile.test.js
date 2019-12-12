import React from "react";
import renderer from "react-test-renderer";

import { MagistratMapMandatairesPanelProfile } from "./MagistratMapMandatairesPanelProfile";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMapMandatairesPanelProfile />).toJSON();
  expect(tree).toMatchSnapshot();
});
