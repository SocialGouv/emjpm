import React from "react";
import renderer from "react-test-renderer";

import { ResetPassword } from "./ResetPassword";

it("renders correctly", () => {
  const tree = renderer.create(<ResetPassword />).toJSON();
  expect(tree).toMatchSnapshot();
});
