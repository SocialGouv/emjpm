import { buildKeys } from "./keysBuilder.service";

export const DIRECTION = {
  DIRECTION_TYPE: buildKeys({
    departemental: "Direction départementale",
    national: "Direction nationale",
    regional: "Direction régionale",
  }),
};
