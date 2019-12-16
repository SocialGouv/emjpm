import React from "react";
import renderer from "react-test-renderer";

import { ServiceMapPanelMesures } from "./ServiceMapPanelMesures";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMapPanelMesures />).toJSON();
  expect(tree).toMatchSnapshot();
});
