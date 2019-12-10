import React from "react";
import renderer from "react-test-renderer";

import { MandatairesMesures } from "./MandatairesMesures";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesMesures />).toJSON();
  expect(tree).toMatchSnapshot();
});
