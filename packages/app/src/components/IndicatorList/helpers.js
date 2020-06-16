export const formatSatisfactionPourcent = (value) => {
  if (!value) {
    return "---";
  }
  const num = (value * 100) / 3;
  return `${Math.round(num)} %`;
};
