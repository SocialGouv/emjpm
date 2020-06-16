exports.up = async (knex) => {
  await knex.raw(`
    CREATE OR REPLACE VIEW public.view_indicateur_inscrit
    AS 
      SELECT d.code, d.nom, u.type, count(m.id) AS count
      FROM mandataires m, users u, departements d
      WHERE m.department_id = d.id AND m.user_id = u.id AND u.active = true
      GROUP BY d.code, d.nom, u.type
      UNION
      SELECT d.code, d.nom, u.type, count(DISTINCT sm.service_id) AS count
      FROM users u, departements d, service_members sm, services s
      WHERE u.active = true AND u.id = sm.user_id AND sm.service_id = s.id AND s.department_id = d.id
      GROUP BY d.code, d.nom, u.type
      UNION
      SELECT d.code, d.nom, u.type, count(DISTINCT m.id) AS count
      FROM tis AS t
      INNER JOIN departements AS d on d.id = t.departement_id
      INNER JOIN magistrat AS m on m.ti_id = t.id
      INNER JOIN users AS u on u.id = m.user_id
      WHERE u.active = true
      GROUP BY d.code, d.nom, u.type;
    `);
};

exports.down = async (knex) => {
  await knex.raw(`
  CREATE OR REPLACE VIEW public.view_indicateur_inscrit
  AS 
    SELECT d.code,
      d.nom,
      u.type,
      count(m.id) AS count
    FROM mandataires m,
      users u,
      departements d
    WHERE m.department_id = d.id AND m.user_id = u.id AND u.active = true
    GROUP BY d.code, d.nom, u.type
    UNION
    SELECT d.code,
      d.nom,
      u.type,
      count(DISTINCT sm.service_id) AS count
     FROM users u,
      departements d,
      service_members sm,
      services s
    WHERE u.active = true AND u.id = sm.user_id AND sm.service_id = s.id AND s.department_id = d.id
    GROUP BY d.code, d.nom, u.type;  
    `);
};
