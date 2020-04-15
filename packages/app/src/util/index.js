export * from "./browser";
export * from "./users/UserUtils";

export const formatTribunauxOptions = tribunaux => {
  return tribunaux.map(({ ti }) => {
    return {
      label: ti.etablissement,
      value: ti.id
    };
  });
};
