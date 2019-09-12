import React from "react";
import { MesureList } from "./MesureList";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MesureList />).toJSON();
  expect(tree).toMatchSnapshot();
});
