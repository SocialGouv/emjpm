import { useMemo } from "react";
import { get30DaysIntervalTimestampz } from "~/util/dates";

export default function use30DaysInterval(d = new Date()) {
  const day = d.getDate();
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  return useMemo(() => get30DaysIntervalTimestampz(d), [day]);
}
