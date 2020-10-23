import { DataSource } from "../../../datasource";

export const departmentAvailabilities = async (
  _: any,
  // tslint:disable-next-line: variable-name
  _args: any,
  { dataSources }: { dataSources: DataSource }
) => {
  // const res = await dataSources.departmentAvailabilityAPI.all();
  // return res.map(availability => {
  //   const max = availability.mesures_max || 0;
  //   const awaiting = availability.mesures_awaiting || 0;
  //   const inProgress = availability.mesures_in_progress || 0;
  //   const available = max - inProgress - awaiting;
  //   return {
  //     available,
  //     awaiting,
  //     department: availability.department,
  //     inProgress,
  //     max
  //   };
  // });
  return {};
};
