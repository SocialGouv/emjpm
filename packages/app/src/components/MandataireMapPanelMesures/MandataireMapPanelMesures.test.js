import React from "react";
import renderer from "react-test-renderer";

import { MandataireMapPanelMesures } from "./MandataireMapPanelMesures";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMapPanelMesures />).toJSON();
  expect(tree).toMatchSnapshot();
});
