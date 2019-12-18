import React from "react";
import renderer from "react-test-renderer";

import { MandataireMesureAccept } from "./MandataireMesureAccept";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMesureAccept />).toJSON();
  expect(tree).toMatchSnapshot();
});
