import React from "react";
import renderer from "react-test-renderer";

import { MagistratMapMandataires } from "./MagistratMapMandataires";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMapMandataires />).toJSON();
  expect(tree).toMatchSnapshot();
});
