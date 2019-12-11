import React from "react";
import renderer from "react-test-renderer";

import { MagistratMandatairesList } from "./MagistratMandatairesList";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMandatairesList />).toJSON();
  expect(tree).toMatchSnapshot();
});
