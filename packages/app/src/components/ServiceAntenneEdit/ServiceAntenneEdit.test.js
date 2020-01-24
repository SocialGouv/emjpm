import React from "react";
import renderer from "react-test-renderer";

import { ServiceAntenneEdit } from "./ServiceAntenneEdit";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceAntenneEdit />).toJSON();
  expect(tree).toMatchSnapshot();
});
