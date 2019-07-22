import { addMonths, isBefore } from "date-fns";
import {
  MesureStateCategory,
  MesureStateCategoryStatistic,
  MesureTypeCategory,
  MesureTypeCategoryEvolution,
  MesureTypeCategoryStatistic,
  MonthlyNumber
} from "../../../../types/resolvers-types";

const buildMesureStateCategoryStatistic = (
  mesureStateCategory: MesureStateCategory
) => {
  return {
    mesureStateCategory,
    number: 0,
    percentage: 0
  };
};
const buildMesureCategoryTypeStatistic = (
  mesureTypeCategory: MesureTypeCategory
) => {
  return {
    mesureTypeCategory,
    number: 0
  };
};

export const buildMesureStateCategoryStatistics: () => MesureStateCategoryStatistic[] = () => {
  return [
    buildMesureStateCategoryStatistic(MesureStateCategory.Closed),
    buildMesureStateCategoryStatistic(MesureStateCategory.InProgress),
    buildMesureStateCategoryStatistic(MesureStateCategory.Awaiting)
  ];
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
