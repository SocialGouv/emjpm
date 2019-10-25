import React from "react";
import { PaginatedList } from "./PaginatedList";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<PaginatedList />).toJSON();
  expect(tree).toMatchSnapshot();
});
