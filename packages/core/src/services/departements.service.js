export function getDepartementCode(zipcode) {
  if (!zipcode || zipcode.length !== 5) {
    throw new Error("zip code is invalid");
  }
  if (zipcode.startsWith("20")) {
    // Corse
    return parseInt(zipcode) < 20200 ? "2A" : "2B";
  } else if (zipcode.startsWith("97") || zipcode.startsWith("98")) {
    // Dom-Tom
    return zipcode.substring(0, 3);
  } else {
    return zipcode.substring(0, 2);
  }
}
