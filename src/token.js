//

export function getJWTPayloadFormLocalStorageIdToken() {
  const token = localStorage.getItem("id_token") || "";
  const [, payloadPart = ""] = token.split(".");
  return JSON.parse(atob(payloadPart) || "{}");
}
