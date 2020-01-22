import React from "react";
import renderer from "react-test-renderer";

import { MandataireMesures } from "./MandataireMesures";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireMesures />).toJSON();
  expect(tree).toMatchSnapshot();
});
