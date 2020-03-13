import React from "react";
import renderer from "react-test-renderer";

import { ServiceMesureImport } from "./ServiceMesureImport";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesureImport />).toJSON();
  expect(tree).toMatchSnapshot();
});
