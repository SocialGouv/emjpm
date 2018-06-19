exports.up = function(knex, Promise) {
	return knex.schema.createTable("regions", table => {
		table.increments("id");
		table.string("nom").notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable("region");
};
