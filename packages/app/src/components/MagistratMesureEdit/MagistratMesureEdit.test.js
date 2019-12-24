import React from "react";
import renderer from "react-test-renderer";

import { MagistratMesureEdit } from "./MagistratMesureEdit";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMesureEdit />).toJSON();
  expect(tree).toMatchSnapshot();
});
