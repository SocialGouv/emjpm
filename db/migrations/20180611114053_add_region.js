exports.up = function(knex, Promise) {
	return knex.schema.createTable("regions", table => {
		table.increments("id_region");
		table.string("nom_region").notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable("regions");
};
