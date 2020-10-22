import { DataSource } from "../../../datasource";
import { DepartmentAvailabilityResult } from "../../../datasource/department-availability.api";
import { QueryAvailableMesureNumberArgs } from "../../../types/resolvers-types";

export const availableMesureNumber = async (
  _: any,
  args: QueryAvailableMesureNumberArgs,
  { dataSources }: { dataSources: DataSource }
) => {
  const res = await dataSources.departmentAvailabilityAPI.all();
  return res.reduce(
    (acc: number, availability: DepartmentAvailabilityResult) => {
      if (args.region && args.region !== availability.department.id_region) {
        return acc;
      }
      if (args.department && args.department !== availability.department.id) {
        return acc;
      }
      const max = availability.mesures_max || 0;
      const awaiting = availability.mesures_awaiting || 0;
      const inProgress = availability.mesures_in_progress || 0;
      return acc + (max - inProgress - awaiting);
    },
    0
  );
};
