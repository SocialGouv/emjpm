import React from "react";
import renderer from "react-test-renderer";

import { MagistratMesureMap } from "./MagistratMesureMap";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMesureMap />).toJSON();
  expect(tree).toMatchSnapshot();
});
