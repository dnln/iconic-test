exports.up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("full_name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
  });
};

exports.down = async function(knex) {
  return knex.schema.dropTable("users");
};
