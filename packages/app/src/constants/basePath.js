export const PATH = {
  admin: "/admin",
  direction: "/direction",
  individuel: "/mandataires",
  prepose: "/mandataires",
  service: "/services",
  ti: "/magistrats",
  greffier: "/greffiers",
  dpfi: "/dpfi",
  sdpf: "/sdpf",
};

export function getUserBasePath({ type }) {
  return PATH[type];
}
