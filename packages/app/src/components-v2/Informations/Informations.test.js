import React from "react";
import renderer from "react-test-renderer";

import { Informations } from "./Informations";

it("renders correctly", () => {
  const tree = renderer.create(<Informations />).toJSON();
  expect(tree).toMatchSnapshot();
});
