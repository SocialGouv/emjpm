import React from "react";
import renderer from "react-test-renderer";

import { AdminServices } from "./AdminServices";

it("renders correctly", () => {
  const tree = renderer.create(<AdminServices />).toJSON();
  expect(tree).toMatchSnapshot();
});
