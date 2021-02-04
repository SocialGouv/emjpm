export function formatTribunauxOptions(tribunaux) {
  return tribunaux
    .filter(({ ti }) => ti)
    .map(({ ti }) => {
      return {
        label: ti.etablissement,
        value: ti.id,
      };
    });
}
