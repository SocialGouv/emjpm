import React from "react";
import renderer from "react-test-renderer";

import { MesureImport } from "./MesureImport";

it("renders correctly", () => {
  const tree = renderer.create(<MesureImport />).toJSON();

  expect(tree).toMatchSnapshot();
});
