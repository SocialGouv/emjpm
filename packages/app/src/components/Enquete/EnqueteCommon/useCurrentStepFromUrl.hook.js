const { useUrlQueryValues } = require("~/util/url");

export function useCurrentStepFromUrl() {
  return useUrlQueryValues([
    {
      defaultValue: 0,
      name: "step",
      type: "integer",
    },
    {
      defaultValue: 0,
      name: "substep",
      type: "integer",
    },
  ]);
}
