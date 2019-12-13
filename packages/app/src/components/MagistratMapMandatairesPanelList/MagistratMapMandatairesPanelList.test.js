import React from "react";
import renderer from "react-test-renderer";

import { MagistratMapMandatairesPanelList } from "./MagistratMapMandatairesPanelList";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMapMandatairesPanelList />).toJSON();
  expect(tree).toMatchSnapshot();
});
