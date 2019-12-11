import React from "react";
import renderer from "react-test-renderer";

import { ServiceInformationsSidebar } from "./ServiceInformationsSidebar";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceInformationsSidebar />).toJSON();
  expect(tree).toMatchSnapshot();
});
