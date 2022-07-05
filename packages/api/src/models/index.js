const knexConnection = require("~/db/knex");

const { Model } = require("objection");

Model.knex(knexConnection);

// fix Warning: Accessing non-existent property 'User' of module exports inside circular dependency
// see https://github.com/Vincit/objection.js/issues/787#issuecomment-364047113

module.exports.AccessToken = require("./AccessToken");
module.exports.ApiLog = require("./ApiLog");
module.exports.AuthorizationCodes = require("./AuthorizationCodes");
module.exports.Config = require("./Config");
module.exports.Departement = require("./Departement");
module.exports.Direction = require("./Direction");
module.exports.Editors = require("./Editors");
module.exports.EnqueteReponses = require("./EnqueteReponses");
module.exports.EnqueteReponsesActivite = require("./EnqueteReponsesActivite");
module.exports.EnqueteReponsesAgrementsFormations = require("./EnqueteReponsesAgrementsFormations");
module.exports.EnqueteReponsesFinancement = require("./EnqueteReponsesFinancement");
module.exports.EnqueteReponsesInformationsMandataire = require("./EnqueteReponsesInformationsMandataire");
module.exports.EnqueteReponsesModalitesExercice = require("./EnqueteReponsesModalitesExercice");
module.exports.EnqueteReponsesPopulations = require("./EnqueteReponsesPopulations");
module.exports.EnqueteReponsesPreposePersonnelFormation = require("./EnqueteReponsesPreposePersonnelFormation");
module.exports.EnqueteReponsesPreposePrestationsSociales = require("./EnqueteReponsesPreposePrestationsSociales");
module.exports.EnqueteReponsesPrestationsSociales = require("./EnqueteReponsesPrestationsSociales");
module.exports.EnqueteReponsesServiceInformations = require("./EnqueteReponsesServiceInformations");
module.exports.EnqueteReponsesServicePersonnelFormation = require("./EnqueteReponsesServicePersonnelFormation");
module.exports.Etablissements = require("./Etablissements");
module.exports.GeolocalisationCodePostal = require("./GeolocalisationCodePostal");
module.exports.Greffier = require("./Greffier");
module.exports.ImpersonateLog = require("./ImpersonateLog");
module.exports.Logs = require("./Logs");
module.exports.LbUpdateLog = require("./LbUpdateLog");
module.exports.ListeBlanche = require("./ListeBlanche");
module.exports.Magistrat = require("./Magistrat");
module.exports.Mandataire = require("./Mandataire");
module.exports.MandataireTis = require("./MandataireTis");
module.exports.Mesure = require("./Mesure");
module.exports.MesureEtat = require("./MesureEtat");
module.exports.MesureRessources = require("./MesureRessources");
module.exports.MesureRessourcesPrestationsSociales = require("./MesureRessourcesPrestationsSociales");
module.exports.MutexLock = require("./MutexLock");
module.exports.PrestationsSociales = require("./PrestationsSociales");
module.exports.OcmiMandataire = require("./OcmiMandataire");
module.exports.Region = require("./Region");
module.exports.Role = require("./Role");
module.exports.RoutineLog = require("./RoutineLog");
module.exports.Service = require("./Service");
module.exports.ServiceAntenne = require("./ServiceAntenne");
module.exports.ServiceDepartements = require("./ServiceDepartements");
module.exports.ServiceMember = require("./ServiceMember");
module.exports.ServiceMemberInvitation = require("./ServiceMemberInvitation");
module.exports.AdminInvitation = require("./AdminInvitation");
module.exports.ServiceTis = require("./ServiceTis");
module.exports.Tis = require("./Tis");
module.exports.User = require("./User");
module.exports.UserRole = require("./UserRole");
