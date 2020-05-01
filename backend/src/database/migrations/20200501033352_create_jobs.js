exports.up = function(knex) {
  return knex.schema.createTable('jobs', function(table) {
      table.increments();

      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();

      table.string('produtor_id').notNullable();

      table.foreign('produtor_id').references('id').inTable('produtores');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jobs');
};
