export default function formatGestionnaireId(gestionnaireId) {
  const [discriminator, id] = gestionnaireId.split("-");
  let mandataireId = null;
  let serviceId = null;
  if (discriminator === "service") {
    serviceId = Number(id);
  } else {
    mandataireId = Number(id);
  }
  return { mandataireId, serviceId };
}
