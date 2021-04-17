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
      { lieu_vie: {_eq: etablissement_conservation_domicile} },
    ],
  },
`;

const gqlDomicile = `
  {
    _or: [
      { lieu_vie: {_eq: domicile} },
      { lieu_vie: {_eq: sdf} }
    ],
  },
`;

const gqlTutelle = `
  { champ_mesure: {_eq: protection_bien_personne} },
  { nature_mesure: {_eq: tutelle} },
`;

const gqlCuratelle = `
  { champ_mesure: {_eq: protection_bien_personne} },
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
    ]
  },
`;

const gqlNouvelles = `
  { date_nomination : {_gte: $dateStart} },
  { date_nomination : {_lte: $dateEnd} },
`;

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

const gqlRevisionAutre = `
  { resultat_revision: {_eq: dessaisissement_famille} },
  { resultat_revision: {_eq: dessaisissement_autre_mjpm} },
`;

const gqlNatureMesureAutre = `
  { _or: [
    { nature_mesure: {_eq: subroge_curateur} },
    { nature_mesure: {_eq: subroge_tuteur} },
    { nature_mesure: {_eq: mandat_protection_future} },
    { nature_mesure: {_eq: mesure_ad_hoc} },
  ] }
`;

const gqlNatureMesureAutre2 = `
  { _or: [
    { nature_mesure: {_eq: subroge_curateur} },
    { nature_mesure: {_eq: subroge_tuteur} },
    { nature_mesure: {_eq: mandat_protection_future} },
    { nature_mesure: {_eq: mesure_ad_hoc} },
    { nature_mesure: {_eq: sauvegarde_justice} },
  ] }
`;

const gqlChrs = `
  { type_etablissement: { _eq: autre_etablissement_s_ms } },
`;

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
  build2Combinaisons,
  build3Combinaisons,
  gqlAu1erJanvier,
  gqlAu31Decembre,
  gqlBiens,
  gqlChrs,
  gqlCuratelle,
  gqlDomicile,
  gqlDu1erJanvierAu31Decembre,
  gqlEtalblissement,
  gqlNatureMesureAutre,
  gqlNatureMesureAutre2,
  gqlNouvelles,
  gqlPersonne,
  gqlRevisionAutre,
  gqlRevisionChangement,
  gqlSorties,
  gqlTutelle,
};
