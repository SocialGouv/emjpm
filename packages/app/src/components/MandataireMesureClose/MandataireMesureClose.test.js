import React from "react";
import renderer from "react-test-renderer";

import { MandataireMesureClose } from "./MandataireMesureClose";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMesureClose />).toJSON();
  expect(tree).toMatchSnapshot();
});
