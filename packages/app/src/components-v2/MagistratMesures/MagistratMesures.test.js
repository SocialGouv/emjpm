import React from "react";
import renderer from "react-test-renderer";

import { MagistratMesures } from "./MagistratMesures";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMesures />).toJSON();
  expect(tree).toMatchSnapshot();
});
