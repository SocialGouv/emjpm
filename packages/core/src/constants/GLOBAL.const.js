import { buildKeys } from "./keysBuilder.service";

export const GLOBAL = {
  COUNTRIES: buildKeys({
    BE: "Belgique",
    FR: "France",
  }),
};
