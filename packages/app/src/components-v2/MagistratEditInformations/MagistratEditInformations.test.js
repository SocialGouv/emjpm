import React from "react";
import renderer from "react-test-renderer";

import { MagistratEditInformations } from "./MagistratEditInformations";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratEditInformations />).toJSON();
  expect(tree).toMatchSnapshot();
});
