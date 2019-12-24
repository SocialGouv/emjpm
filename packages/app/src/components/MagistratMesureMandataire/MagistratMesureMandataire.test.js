import React from "react";
import renderer from "react-test-renderer";

import { MagistratMesureMandataire } from "./MagistratMesureMandataire";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMesureMandataire />).toJSON();
  expect(tree).toMatchSnapshot();
});
