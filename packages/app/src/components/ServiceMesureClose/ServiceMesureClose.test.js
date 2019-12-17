import React from "react";
import renderer from "react-test-renderer";

import { ServiceMesureClose } from "./ServiceMesureClose";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceMesureClose />).toJSON();
  expect(tree).toMatchSnapshot();
});
