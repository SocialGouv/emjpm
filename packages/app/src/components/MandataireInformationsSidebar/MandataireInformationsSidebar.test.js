import React from "react";
import renderer from "react-test-renderer";

import { MandataireInformationsSidebar } from "./MandataireInformationsSidebar";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireInformationsSidebar />).toJSON();
  expect(tree).toMatchSnapshot();
});
