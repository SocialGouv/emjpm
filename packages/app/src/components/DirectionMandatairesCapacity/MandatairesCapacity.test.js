import React from "react";
import renderer from "react-test-renderer";

import { MandatairesCapacity } from "./MandatairesCapacity";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesCapacity />).toJSON();
  expect(tree).toMatchSnapshot();
});
