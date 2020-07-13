import { months } from "../../constants";
import { getMesureCategoryNatureLabel } from "../../util/mesures";

const getEvolution = (data) => {
  const evolutionDatas = [];
  const evolutionFilters = [];
  data.map((nature, index) => {
    evolutionFilters[index] = {
      label: getMesureCategoryNatureLabel(nature.mesureNatureCategory),
      value: nature.mesureNatureCategory,
    };
    nature.monthlyEvolutions.map((monthlyEvolution, index) => {
      evolutionDatas[index] = {
        ...evolutionDatas[index],
        [getMesureCategoryNatureLabel(nature.mesureNatureCategory)]: monthlyEvolution.number,
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
