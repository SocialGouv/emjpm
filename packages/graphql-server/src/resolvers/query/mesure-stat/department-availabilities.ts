import { departmentAvailabilityQuery } from "../../../client/department-availibility.query";

export const departmentAvailabilities = async () => {
  const res = await departmentAvailabilityQuery.all();
  return res.map(availability => {
    const max = availability.mesures_max || 0;
    const awaiting = availability.mesures_awaiting || 0;
    const inProgress = availability.mesures_in_progress || 0;
    const available = max - inProgress - awaiting;
    return {
      available,
      awaiting,
      department: availability.department,
      inProgress,
      max
    };
  });
};
