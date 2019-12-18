import React from "react";
import renderer from "react-test-renderer";

import { MandataireMesureEdit } from "./MandataireMesureEdit";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMesureEdit />).toJSON();
  expect(tree).toMatchSnapshot();
});
