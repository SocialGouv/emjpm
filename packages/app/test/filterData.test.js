import filterData from "../src/components/common/filterData";

const data = [
  {
    a: "aaa"
  },
  {
    a: "abc"
  },
  {
    a: "bcd"
  },
  {
    a: "aaa"
  },
  {
    a: "eee"
  },
  {
    a: "BCD"
  }
];

test("should filter data", () => {
  expect(
    filterData(data, {
      content: "a",
      filter: "aaa"
    })
  ).toEqual([{ a: "aaa" }, { a: "aaa" }]);
});

test("should ignore case", () => {
  expect(
    filterData(data, {
      content: "a",
      filter: "bcd"
    })
  ).toEqual([{ a: "bcd" }, { a: "BCD" }]);
});

test("should match anywhere in the string", () => {
  expect(
    filterData(data, {
      content: "a",
      filter: "cd"
    })
  ).toEqual([{ a: "bcd" }, { a: "BCD" }]);
});
