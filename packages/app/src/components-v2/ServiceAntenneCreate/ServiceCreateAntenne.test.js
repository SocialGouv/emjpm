import React from "react";
import renderer from "react-test-renderer";

import { ServiceCreateAntenne } from "./ServiceCreateAntenne";

it("renders correctly", () => {
  const tree = renderer.create(<ServiceCreateAntenne />).toJSON();
  expect(tree).toMatchSnapshot();
});
