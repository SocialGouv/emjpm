import React from "react";
import { MandataireCapacity } from "./MandataireCapacity";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MandataireCapacity />).toJSON();
  expect(tree).toMatchSnapshot();
});
