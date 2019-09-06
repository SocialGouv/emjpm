import React from "react";
import { MandatairesList } from "./MandatairesList";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MandatairesList />).toJSON();
  expect(tree).toMatchSnapshot();
});
