import { addMonths, isBefore } from "date-fns";
import {
  MesureNatureCategory,
  MesureNatureCategoryEvolution,
  MesureNatureCategoryStatistic,
  MonthlyNumber
} from "../../../../types/resolvers-types";

const buildMesureCategoryNatureStatistic = (
  mesureNatureCategory: MesureNatureCategory
) => {
  return {
    mesureNatureCategory,
    number: 0
  };
};

export const buildMesureNatureCategoryStatistics: () => MesureNatureCategoryStatistic[] = () => {
  return [
    buildMesureCategoryNatureStatistic(MesureNatureCategory.Tutelle),
    buildMesureCategoryNatureStatistic(MesureNatureCategory.CuratelleRenforcee),
    buildMesureCategoryNatureStatistic(MesureNatureCategory.CuratelleSimple),
    buildMesureCategoryNatureStatistic(MesureNatureCategory.SauvegardeJustice),
    buildMesureCategoryNatureStatistic(MesureNatureCategory.Other)
  ];
};

const buildMesureNatureCategoryEvolution = (
  start: string,
  end: string,
  mesureNatureCategory: MesureNatureCategory
): MesureNatureCategoryEvolution => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let refDate = startDate;

  const monthlyEvolutions: MonthlyNumber[] = [];
  while (isBefore(refDate, endDate)) {
    monthlyEvolutions.push({
      month: refDate.getMonth(),
      number: 0,
      year: refDate.getFullYear()
    });
    refDate = addMonths(refDate, 1);
  }
  return {
    end,
    mesureNatureCategory,
    monthlyEvolutions,
    start
  };
};

export const buildMesureNatureCategoryEvolutions = (
  start: string,
  end: string
) => {
  return [
    buildMesureNatureCategoryEvolution(start, end, MesureNatureCategory.Tutelle),
    buildMesureNatureCategoryEvolution(
      start,
      end,
      MesureNatureCategory.CuratelleRenforcee
    ),
    buildMesureNatureCategoryEvolution(
      start,
      end,
      MesureNatureCategory.CuratelleSimple
    ),
    buildMesureNatureCategoryEvolution(
      start,
      end,
      MesureNatureCategory.SauvegardeJustice
    ),
    buildMesureNatureCategoryEvolution(start, end, MesureNatureCategory.Other)
  ];
};
