import React from "react";
import renderer from "react-test-renderer";

import { AccessTokenDelete } from "./AccessTokenDelete";

it("renders correctly", () => {
  const tree = renderer.create(<AccessTokenDelete />).toJSON();
  expect(tree).toMatchSnapshot();
});
