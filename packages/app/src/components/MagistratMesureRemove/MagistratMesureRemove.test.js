import React from "react";
import renderer from "react-test-renderer";

import { MagistratMesureRemove } from "./MagistratMesureRemove";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMesureRemove />).toJSON();
  expect(tree).toMatchSnapshot();
});
