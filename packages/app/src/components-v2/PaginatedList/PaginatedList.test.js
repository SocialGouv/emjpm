import React from "react";
import renderer from "react-test-renderer";

import { PaginatedList } from "./PaginatedList";

it("renders correctly", () => {
  const tree = renderer.create(<PaginatedList />).toJSON();
  expect(tree).toMatchSnapshot();
});
