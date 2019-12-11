import React from "react";
import renderer from "react-test-renderer";

import { MandataireMesureImport } from "./MandataireMesureImport";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMesureImport />).toJSON();
  expect(tree).toMatchSnapshot();
});
