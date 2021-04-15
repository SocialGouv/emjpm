const gqlAu1erJanvier = `
  { date_nomination: {_lte: $dateStart} },
  {
    _or: [
      { date_fin_mesure : {_lte: $dateStart} },
      { date_fin_mesure : {_is_null: true} }
    ]
  },
`;

const gqlAu31Decembre = `
  { date_nomination : {_gte: $dateStart} },
  { date_nomination : {_lte: $dateEnd} },
  {
    _or: [
      { date_fin_mesure : { _gte: $dateEnd }},
      { date_fin_mesure : { _is_null: true }}
    ]
  },
`;

const gqlDu1erJanvierAu31Decembre = `
  { date_nomination : {_lte: $dateEnd} },
  {
    _or: [
      { date_fin_mesure : { _gte: $dateStart }},
      { date_fin_mesure : { _is_null: true }}
    ]
  },
`;

const gqlEtalblissement = `
  {
    _or: [
      { lieu_vie: {_eq: etablissement} },
    ],
  },
`;

const gqlDomicile = `
  {
    _or: [
      { lieu_vie: {_eq: domicile} },
      { lieu_vie: {_eq: etablissement_conservation_domicile} },
      { lieu_vie: {_eq: sdf} }
    ],
  },
`;
// ???

const gqlCuratelle = `
  {
    _or: [
      { nature_mesure: {_eq: curatelle_simple} },
      { nature_mesure: {_eq: curatelle_renforcee} }
    ]
  },      
`;

const gqlBiens = `
  { champ_mesure: {_eq: protection_bien} },
`;
const gqlPersonne = `
  {
    _or: [
      {champ_mesure: {_eq: protection_personne} },
      {champ_mesure: {_eq: protection_bien_personne} }
    ]
  },
`;
// ???

const gqlNouvelles = `
  { date_nomination : {_gte: $dateStart} },
  { date_nomination : {_lte: $dateEnd} },
`;
// ???
// { date_fin_mesure: { _gte: $dateEnd } },
// { date_fin_mesure: { _is_null: true } },

const gqlSorties = `
  { date_fin_mesure : {_gte: $dateStart} },
  { date_fin_mesure : {_lte: $dateEnd} },
`;

const gqlRevisionChangement = `
  { _or: [
    { resultat_revision: {_eq: aggravation} },
    { resultat_revision: {_eq: allegement} },
  ] }
`;
// ???

const gqlRevisionAutre = `
  { resultat_revision: {_eq: dessaisissement_famille} },
  { resultat_revision: {_eq: dessaisissement_autre_mjpm} },
`;
// ???

const gqlRevisionMASP = `
  { _or: [
    { resultat_revision: {_eq: dessaisissement_famille} },
    { resultat_revision: {_eq: dessaisissement_autre_mjpm} },
  ] }
`;
// ??? rajouter MASP dans resultat_revision_mesure

const gqlCauseSortieMASP = `
  { _or: [
    { cause_sortie: {_eq: dessaisissement_famille} },
    { cause_sortie: {_eq: dessaisissement_autre_mjpm} },
  ] }
`;
// ??? rajouter MASP dans cause_sortie_mesure

const gqlNatureMesureAutre = `
  { _or: [
    { nature_mesure: {_eq: subroge_curateur} },
    { nature_mesure: {_eq: subroge_tuteur} },
    { nature_mesure: {_eq: mandat_protection_future} },
    { nature_mesure: {_eq: mesure_ad_hoc} },
  ] }
`;
//???

const gqlEhpad = `
  { type_etablissement: { _eq: etablissement_personne_agee } },
`;
//???

const gqlChrs = `
  { type_etablissement: { _eq: autre_etablissement_s_ms } },
`;
//???

function build2Combinaisons(prefixes, suffixes, separator) {
  if (separator === undefined) {
    separator = "_";
  }
  return prefixes
    .reduce(
      (acc, prefix) =>
        suffixes.reduce((acc, suffix) => {
          acc.push(`${prefix}${separator}${suffix}`);
          return acc;
        }, acc),

      []
    )
    .join("\n");
}
function build3Combinaisons(prefixes, middles, suffixes, separator) {
  if (separator === undefined) {
    separator = "_";
  }
  return prefixes
    .reduce(
      (acc, prefix) =>
        middles.reduce(
          (acc, middle) =>
            suffixes.reduce((acc, suffix) => {
              acc.push(`${prefix}${separator}${middle}${separator}${suffix}`);
              return acc;
            }, acc),
          acc
        ),
      []
    )
    .join("\n");
}

module.exports = {
  gqlAu1erJanvier,
  gqlAu31Decembre,
  gqlBiens,
  gqlCauseSortieMASP,
  gqlChrs,
  gqlCuratelle,
  build2Combinaisons,
  gqlDomicile,
  build3Combinaisons,
  gqlDu1erJanvierAu31Decembre,
  gqlEhpad,
  gqlEtalblissement,
  gqlNatureMesureAutre,
  gqlNouvelles,
  gqlPersonne,
  gqlRevisionAutre,
  gqlRevisionChangement,
  gqlRevisionMASP,
  gqlSorties,
};
