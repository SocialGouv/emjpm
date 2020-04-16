exports.up = function(knex) {
  return knex.raw(`
update tis set ville = trim(ville);

create table tis_mapping (
    old_ti int,
    old_nom varchar,
    old_cp varchar,
    old_ville varchar,
    new_ti int,
    new_nom varchar,
    new_cp varchar,
    new_ville varchar
);

create table tis_tmp (
    ti_id int
);

insert into tis_tmp (ti_id) (select distinct ti_id from magistrat where ti_id in (select id from tis where immutable = false));
insert into tis_tmp (ti_id) (select distinct ti_id from service_tis where ti_id in (select id from tis where immutable = false));
insert into tis_tmp (ti_id) (select distinct ti_id from user_tis where ti_id in (select id from tis where immutable = false));

insert into tis_mapping (old_ti) (select distinct ti_id from tis_tmp);
drop table tis_tmp;

update tis_mapping set old_cp = (select code_postal from tis where tis.id = tis_mapping.old_ti);
update tis_mapping set old_nom = (select etablissement from tis where tis.id = tis_mapping.old_ti);
update tis_mapping set old_ville = (select ville from tis where tis.id = tis_mapping.old_ti);

update tis_mapping set old_ville = replace(old_ville, ' CEDEX', '');

update tis_mapping set (new_ti, new_cp, new_ville) = (
    select id, code_postal, ville from tis where immutable = true and tis.code_postal = tis_mapping.old_cp
    );

update tis_mapping set (new_ti, new_cp, new_ville) = (
    select id, code_postal, ville from tis where id = 22
    ) where old_cp in ('75018', '75019', '75020');

update tis_mapping set (new_ti, new_cp, new_ville) = (
    select id, code_postal, ville from tis where immutable = true and lower(tis.ville) = lower(tis_mapping.old_ville)
    ) where new_ti is null;

update tis_mapping set (new_ti, new_cp, new_ville) = (
    select id, code_postal, ville from tis where id = 895
    ) where old_ti = 237;

update tis_mapping set (new_ti, new_cp, new_ville) = (
    select id, code_postal, ville from tis where id = 921
    ) where old_ti = 85;

update tis_mapping set (new_ti, new_cp, new_ville) = (
    select id, code_postal, ville from tis where id = 909
    ) where old_ti = 7;

update tis_mapping set (new_ti, new_cp, new_ville) = (
    select id, code_postal, ville from tis where id = 957
    ) where old_ti = 189;

update tis_mapping set (new_ti, new_cp, new_ville) = (
    select id, code_postal, ville from tis where id = 952
    ) where old_ti = 56;

update tis_mapping set (new_ti, new_cp, new_ville) = (
    select id, code_postal, ville from tis where id = 813
    ) where old_ti = 143;

update magistrat set ti_id = (select new_ti from tis_mapping where old_ti = ti_id) where ti_id in (select old_ti from tis_mapping);
update user_tis set ti_id = (select new_ti from tis_mapping where old_ti = ti_id) where ti_id in (select old_ti from tis_mapping);
update service_tis set ti_id = (select new_ti from tis_mapping where old_ti = ti_id) where ti_id in (select old_ti from tis_mapping);
  `);
};

exports.down = function(knex) {
  return knex.raw(`
DROP TABLE tis_mapping;
`);
};
