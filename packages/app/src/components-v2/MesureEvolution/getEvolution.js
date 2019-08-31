import { months } from "../../constants";

const getEvolution = data => {
  const evolutionDatas = [];
  const evolutionFilters = [];
  data.map((type, index) => {
    evolutionFilters[index] = {
      value: type.mesureTypeCategory,
      label: type.mesureTypeCategory
    };
    type.monthlyEvolutions.map((monthlyEvolution, index) => {
      evolutionDatas[index] = {
        ...evolutionDatas[index],
        [type.mesureTypeCategory]: monthlyEvolution.number,
        TOTAL: evolutionDatas[index]
          ? evolutionDatas[index].TOTAL + monthlyEvolution.number
          : monthlyEvolution.number,
        month: months[monthlyEvolution.month]
      };
    });
  });
  evolutionFilters.push({
    value: "TOTAL",
    label: "TOTAL"
  });
  return { evolutionDatas, evolutionFilters };
};

export { getEvolution };
