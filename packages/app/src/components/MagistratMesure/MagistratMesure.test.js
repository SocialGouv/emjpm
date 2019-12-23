import React from "react";
import renderer from "react-test-renderer";

import { MagistratMesure } from "./MagistratMesure";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMesure />).toJSON();
  expect(tree).toMatchSnapshot();
});
