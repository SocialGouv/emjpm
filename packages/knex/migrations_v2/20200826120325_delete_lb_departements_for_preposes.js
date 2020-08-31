exports.up = async function (knex) {
  await knex.raw(`
  DELETE FROM lb_structures 
  WHERE lb_departement_id IN (
	SELECT lbd.id
	FROM lb_departements as lbd
	INNER JOIN lb_users as lbu on lbu.id = lbd.lb_user_id
	WHERE lbu."type" = 'prepose'
  );

  DELETE FROM lb_tribunaux
  WHERE lb_departement_id IN (
    SELECT lbd.id
    FROM lb_departements AS lbd
    INNER JOIN lb_users AS lbu ON lbu.id = lbd.lb_user_id
    WHERE lbu."type" = 'prepose'
  );
  
  DELETE FROM lb_departements 
  WHERE lb_user_id in (select lbu.id from lb_users as lbu WHERE lbu.type = 'prepose');
  `);
};

exports.down = function (knex) {};
