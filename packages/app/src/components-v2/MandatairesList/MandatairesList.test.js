import React from "react";
import renderer from "react-test-renderer";

import { MandatairesList } from "./MandatairesList";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesList />).toJSON();
  expect(tree).toMatchSnapshot();
});
