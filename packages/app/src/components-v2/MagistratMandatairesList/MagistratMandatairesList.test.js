import React from "react";
import { MagistratMandatairesList } from "./MagistratMandatairesList";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MagistratMandatairesList />).toJSON();
  expect(tree).toMatchSnapshot();
});
