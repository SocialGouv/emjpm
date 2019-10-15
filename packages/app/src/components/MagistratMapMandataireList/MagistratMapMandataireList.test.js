import React from "react";
import { MagistratMapMandataireList } from "./MagistratMapMandataireList";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMapMandataireList />).toJSON();
  expect(tree).toMatchSnapshot();
});
