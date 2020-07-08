exports.up = async function (knex) {
  await knex.schema.table("mesures", (table) => {
    table.enu(
      "nature_mesure",
      [
        "curatelle_simple",
        "curatelle_renforcee",
        "tutelle",
        "sauvegarde_justice",
        "mesure_accompagnement_judiciaire",
        "subroge_curateur",
        "subroge_tuteur",
        "mandat_protection_future",
        "mesure_ad_hoc",
      ],
      {
        useNative: true,
        enumName: "nature_mesure_type",
      }
    );
    table.enu(
      "champ_protection",
      ["protection_bien", "protection_personne", "protection_bien_personne"],
      {
        useNative: true,
        enumName: "champ_protection_type",
      }
    );
  });

  await knex.raw(`
update mesures set nature_mesure = 'curatelle_simple' where type in (
  'curatelle',
  'curatelle simple',
  'curatelle simple à la personne',
  'curatelle simple aux biens',
  'curatelle simple aux biens et à la personne');

update mesures set nature_mesure = 'curatelle_renforcee' where type in (
  'curatelle renforcée',
  'curatelle renforcée à la personne',
  'curatelle renforcée aux biens',
  'curatelle renforcée aux biens et à la personne');

update mesures set nature_mesure = 'mesure_accompagnement_judiciaire' where type in ('maj');
update mesures set nature_mesure = 'mandat_protection_future' where type in ('mandat de protection future');
update mesures set nature_mesure = 'mesure_ad_hoc' where type in ('mesure ad hoc');
update mesures set nature_mesure = 'sauvegarde_justice' where type in ('sauvegarde de justice', 'sauvegarde de justice avec mandat spécial');
update mesures set nature_mesure = 'subroge_curateur' where type in ('subrogé curateur');
update mesures set nature_mesure = 'subroge_tuteur' where type in ('subrogé tuteur');
update mesures set nature_mesure = 'tutelle' where type in (
  'tutelle',
  'tutelle à la personne',
  'tutelle aux biens',
  'tutelle aux biens et à la personne');

update mesures set champ_protection = 'protection_personne' where type in (
  'tutelle à la personne',
  'curatelle simple à la personne',
  'curatelle renforcée à la personne');

update mesures set champ_protection = 'protection_bien' where type in (
  'curatelle simple aux biens',
  'curatelle renforcée aux biens',
  'tutelle aux biens');

update mesures set champ_protection = 'protection_bien_personne' where type in (
  'curatelle simple aux biens et à la personne',
  'tutelle aux biens et à la personne',
  'curatelle renforcée aux biens et à la personne');
  `);

  return knex.schema.table("mesures", (table) => {
    table.dropColumn("type");
  });
};

exports.down = function (knex) {
  return knex.raw(`
alter table mesures add type varchar;

alter table mesures drop champ_protection;
alter table mesures drop nature_mesure;

drop type nature_mesure_type;
drop type champ_protection_type;
  `);
};


