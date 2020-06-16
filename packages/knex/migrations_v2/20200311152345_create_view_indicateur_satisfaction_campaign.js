exports.up = async (knex) => {
  await knex.raw(`
    CREATE VIEW public.view_indicateur_satisfaction_campaign AS
    SELECT d.code, d.nom, u.type, avg(sca.value) AS value
    FROM satisfaction_campaign_answers AS sca
    INNER JOIN users AS u on u.id = sca.user_id
    INNER JOIN magistrat AS m on m.user_id = u.id
    INNER JOIN tis AS t on t.id = m.ti_id
    INNER JOIN departements AS d on d.id = t.departement_id
    WHERE sca.satisfaction_campaign_id = (
        SELECT id
        FROM satisfaction_campaigns 
        WHERE NOW() >= started_at
        AND ended_at >= NOW()
    )
    AND u.active = true
    GROUP BY d.code, d.nom, u.type
    UNION
    SELECT d.code, d.nom, u.type, avg(sca.value) AS value
    FROM satisfaction_campaign_answers AS sca
    INNER JOIN users AS u on u.id = sca.user_id
    INNER JOIN mandataires AS m on m.user_id = u.id
    INNER JOIN departements AS d on d.id = m.department_id
    WHERE sca.satisfaction_campaign_id = (
        SELECT id
        FROM satisfaction_campaigns 
        WHERE NOW() >= started_at
        AND ended_at >= NOW()
    )
    AND u.active = true
    GROUP BY d.code, d.nom, u.type
    UNION
    SELECT d.code, d.nom, u.type, avg(sca.value) AS value
    FROM satisfaction_campaign_answers AS sca
    INNER JOIN users AS u on u.id = sca.user_id
    INNER JOIN service_members AS sm on sm.user_id = u.id
    INNER JOIN services AS s on sm.service_id = s.id
    INNER JOIN departements AS d on d.id = s.department_id
    WHERE sca.satisfaction_campaign_id = (
        SELECT id
        FROM satisfaction_campaigns 
        WHERE NOW() >= started_at
        AND ended_at >= NOW()
    )
    AND u.active = true
    GROUP BY d.code, d.nom, u.type;
`);
};

exports.down = async (knex) => {
  await knex.raw(
    `DROP VIEW IF EXISTS public.view_indicateur_satisfaction_campaign`
  );
};
