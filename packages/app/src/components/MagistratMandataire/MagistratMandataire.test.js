import React from "react";
import renderer from "react-test-renderer";

import { MagistratMandataire } from "./MagistratMandataire";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMandataire />).toJSON();
  expect(tree).toMatchSnapshot();
});
