import React from "react";
import renderer from "react-test-renderer";

import { MagistratMesureDelete } from "./MagistratMesureDelete";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMesureDelete />).toJSON();
  expect(tree).toMatchSnapshot();
});
