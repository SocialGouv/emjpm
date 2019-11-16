import React from "react";
import renderer from "react-test-renderer";

import { MandatairesExport } from "./MandatairesExport";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesExport />).toJSON();
  expect(tree).toMatchSnapshot();
});
