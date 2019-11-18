export const getRegionCode = codePostal => {
  let code;
  if (codePostal.startsWith("201")) {
    code = "2A";
  } else if (codePostal.startsWith("202")) {
    code = "2B";
  } else {
    code = codePostal.substring(0, 2);
  }
  return code;
};
