import React from "react";
import renderer from "react-test-renderer";

import { ServiceMesures } from "./ServiceMesures";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesures />).toJSON();
  expect(tree).toMatchSnapshot();
});
