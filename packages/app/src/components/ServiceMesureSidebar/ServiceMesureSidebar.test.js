import React from "react";
import renderer from "react-test-renderer";

import { ServiceMesureSidebar } from "./ServiceMesureSidebar";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesureSidebar />).toJSON();
  expect(tree).toMatchSnapshot();
});
