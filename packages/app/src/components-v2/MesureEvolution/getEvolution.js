import { months } from "../../constants";
import { getMesureCategoryTypeLabel } from "../../util/mesures";

const getEvolution = data => {
  const evolutionDatas = [];
  const evolutionFilters = [];
  data.map((type, index) => {
    evolutionFilters[index] = {
      label: getMesureCategoryTypeLabel(type.mesureTypeCategory),
      value: type.mesureTypeCategory
    };
    type.monthlyEvolutions.map((monthlyEvolution, index) => {
      evolutionDatas[index] = {
        ...evolutionDatas[index],
        [getMesureCategoryTypeLabel(type.mesureTypeCategory)]: monthlyEvolution.number,
        Total: evolutionDatas[index]
          ? evolutionDatas[index].Total + monthlyEvolution.number
          : monthlyEvolution.number,
        month: months[monthlyEvolution.month]
      };
    });
  });
  evolutionFilters.push({
    label: "Total",
    value: "TOTAL"
  });
  return { evolutionDatas, evolutionFilters };
};

export { getEvolution };
