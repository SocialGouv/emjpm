import { months } from "../../constants";
import { getMesureCategoryNatureLabel } from "../../util/mesures";

const getEvolution = (data) => {
  const evolutionDatas = [];
  const evolutionFilters = [];
  data.map((nature, index) => {
    evolutionFilters[index] = {
      label: getMesureCategoryNatureLabel(nature.mesureTypeCategory),
      value: nature.mesureTypeCategory,
    };
    nature.monthlyEvolutions.map((monthlyEvolution, index) => {
      evolutionDatas[index] = {
        ...evolutionDatas[index],
        [getMesureCategoryNatureLabel(nature.mesureTypeCategory)]: monthlyEvolution.number,
        Total: evolutionDatas[index]
          ? evolutionDatas[index].Total + monthlyEvolution.number
          : monthlyEvolution.number,
        month: months[monthlyEvolution.month],
      };
    });
  });
  evolutionFilters.push({
    label: "Total",
    value: "TOTAL",
  });
  return { evolutionDatas, evolutionFilters };
};

export { getEvolution };
