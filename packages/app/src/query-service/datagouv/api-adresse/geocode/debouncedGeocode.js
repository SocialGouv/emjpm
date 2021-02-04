import pDebounce from "p-debounce";

import { geocode } from "./geocode";

const debouncedGeocode = pDebounce(geocode, 500);

export { debouncedGeocode };
