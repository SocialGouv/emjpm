import React from "react";
import renderer from "react-test-renderer";

import { MandataireMesureReactivate } from "./MandataireMesureReactivate";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMesureReactivate />).toJSON();
  expect(tree).toMatchSnapshot();
});
