exports.up = function(knex, Promise) {
	return knex.schema.alterTable("mandataires", function(table) {
		table.float("nb_secretariat").alter();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.alterTable("mandataires", function(table) {
		table.interger("nb_secretariat").alter();
	});
};
