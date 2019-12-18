import React from "react";
import renderer from "react-test-renderer";

import { MandataireMesureSidebar } from "./MandataireMesureSidebar";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMesureSidebar />).toJSON();
  expect(tree).toMatchSnapshot();
});
