import { addMonths, isBefore } from "date-fns";
import {
  MesureTypeCategory,
  MesureTypeCategoryEvolution,
  MesureTypeCategoryStatistic,
  MonthlyNumber
} from "../../../../types/resolvers-types";

const buildMesureCategoryTypeStatistic = (
  mesureTypeCategory: MesureTypeCategory
) => {
  return {
    mesureTypeCategory,
    number: 0
  };
};

export const buildMesureTypeCategoryStatistics: () => MesureTypeCategoryStatistic[] = () => {
  return [
    buildMesureCategoryTypeStatistic(MesureTypeCategory.CuratelleRenforcee),
    buildMesureCategoryTypeStatistic(MesureTypeCategory.CuratelleSimple),
    buildMesureCategoryTypeStatistic(MesureTypeCategory.Other),
    buildMesureCategoryTypeStatistic(MesureTypeCategory.SauvegardeJustice),
    buildMesureCategoryTypeStatistic(MesureTypeCategory.Tutelle)
  ];
};

const buildMesureTypeCategoryEvolution = (
  start: string,
  end: string,
  mesureTypeCategory: MesureTypeCategory
): MesureTypeCategoryEvolution => {
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
    mesureTypeCategory,
    monthlyEvolutions,
    start
  };
};

export const buildMesureTypeCategoryEvolutions = (
  start: string,
  end: string
) => {
  return [
    buildMesureTypeCategoryEvolution(
      start,
      end,
      MesureTypeCategory.CuratelleRenforcee
    ),
    buildMesureTypeCategoryEvolution(
      start,
      end,
      MesureTypeCategory.CuratelleSimple
    ),
    buildMesureTypeCategoryEvolution(start, end, MesureTypeCategory.Other),
    buildMesureTypeCategoryEvolution(
      start,
      end,
      MesureTypeCategory.SauvegardeJustice
    ),
    buildMesureTypeCategoryEvolution(start, end, MesureTypeCategory.Tutelle)
  ];
};
