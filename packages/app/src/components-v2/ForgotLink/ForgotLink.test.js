import React from "react";
import renderer from "react-test-renderer";

import { ForgotLink } from "./ForgotLink";

it("renders correctly", () => {
  const tree = renderer.create(<ForgotLink />).toJSON();
  expect(tree).toMatchSnapshot();
});
