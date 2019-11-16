import React from "react";
import renderer from "react-test-renderer";

import { AdminFilterBar } from "./AdminFilterBar";

it("renders correctly", () => {
  const tree = renderer.create(<AdminFilterBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
