import React from "react";
import renderer from "react-test-renderer";

import { TokenRequest } from "./TokenRequest";

it("renders correctly", () => {
  const tree = renderer.create(<TokenRequest />).toJSON();
  expect(tree).toMatchSnapshot();
});
