import React from "react";
import renderer from "react-test-renderer";

import { MagistratMapMandataireList } from "./MagistratMapMandataireList";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMapMandataireList />).toJSON();
  expect(tree).toMatchSnapshot();
});
